# Finalproject

## Description
#### Using data acquired from the City of Austin, our team is aiming to create a classification model which will predict 311 service request response time. 

## Goals
#### Create a machine learning model to predict the response times for a 311 call.
#### See how response time is affected by a number of factors, including responsive department, time of request, and zip code.

## Data Source
#### Data was gathered from "The City of Austin" website, as well as the Census Data Portal.
#### https://data.austintexas.gov/Utilities-and-City-Services/Austin-311-Public-Data/xwdj-i9he/data
#### https://data.census.gov/cedsci/

## Data Exploration
EDA was done with a combination of Tableau Desktop and Python, and sought to answer primarily the following questions:
1. How has request volume changed over time, year-to-year, month-to-month and hour-to-hour?
![Requests by Year](https://raw.githubusercontent.com/GyanwaliEliza/Finalproject/main/Calls_by_year.png)
![Requests by Month](https://raw.githubusercontent.com/GyanwaliEliza/Finalproject/main/Calls_by_month.png)
![Requests by Hour](https://raw.githubusercontent.com/GyanwaliEliza/Finalproject/main/Calls_by_Hour%20(2).png)
3. What are the most common request types?
![Requests by Type](https://raw.githubusercontent.com/GyanwaliEliza/Finalproject/main/circle/eda_graphs/calls_by_type.png)
5. What departments have to respond to service requests the most?
![Requests by Department](https://raw.githubusercontent.com/GyanwaliEliza/Finalproject/main/Calls_by_Dept.png)
7. How quickly do service requests move to “Closed” status? 
  - 75% of all Requests are reported as "Closed" within 5 days

Further analysis was done on the Zip Code level, seeking to answer both which Zip Codes make the most service requests, and are there any differences from the patterns established above. Although there were some minor variations, in the most meaningful way the patterns held true. However, once 2019 American Community Survey census data was added and Zip Codes were categorized between "Above 120% Citywide Median Family Income", "80-120% Citywide MFI", and "Below 80% Citywide MFI", we did find that Zip Codes in the "Above 120%" category produced more than 50% of the request volume in the sample data. 

## Machine Learning Model
### Preliminary Data Preprocessing
- Because we are focused on 311 ticket completion time, the first step in our data preprocessing was to convert the data in the "sr_created_date" and "sr_closed_date" columns to the DateTime data type using the pandas.to_datetime function. These new DateTime values were assigned to new "Created Date" and "Closed Date" columns respectively. New "Request Year", "Request Month", and "Time of Day" columns were created using the year DateTime information from the "Created Date" column. 
- We then filtered the entire DataFrame using the "Request Year" column to only include those 311 tickets that were created in the year 2019. This large reduction in the dataset was to create a dataframe that had a manageable number of rows given the RAM constraints of our computers. A "Total Seconds" column was created that calculated the total number of seconds each ticket remained open. The DataFrame was then filtered again using the "Total Seconds" column to include only those 311 tickets that were open for < 31540000 seconds (~ 1 year). This was necessary to exclude some extremely large outliers in the dataset. 
- Next, we used the median number of seconds in the "Total Seconds" column to create the cutoff for our new target variable. Tickets that were open for less than or equal to the median response time were labeled with the "Quick Response" descriptor. Tickets that were open for more than the median response time were labeled with the "Slow Response" descriptor. These descriptors were assigned to a new "Response Time" column. 
- Each month integer (i.e., 1 to 12) in the "Request Month" column was transformed to its corresponding month name (i.e., January to December).
- Groups of 4 consecutive hour integers (i.e., 0 to 23 based on a 24-hour time clock) in the "Time of Day" column were transformed into assigned time period descriptors (i.e., early morning, mid morning, late morning, etc.).
- The next major preprocessing step was to group all of the 311 ticket descriptors into various "Department" types. All tickets were categorized as one of the following types: code, animal, public, resource, transport, watershed, park, water, health, housing, or fire.

![Image of 311 Types](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_types.png)

- Each 311 type was then assigned a department descriptor: Austin Code, Animal Services, Public Works, Austin Resource Recovery, Austin Transportation, Watershed Check, Parks and Recreation, Austin Water, Public Health, Housing and Planning, Austin Fire. These descriptors were added to a new "Department" column. 
- Next we had to drop several DataFrame columns that contained information that would not be pertinent to our final machine learning model. These column feature reductions were based on our preliminary machine learning testing, which can be found in the file "MachineLearningModel_Seg1.ipynb". When calculating feature importance, the data in these columns was found to be negligible and considerably slowed down our processing time since most of these columns contained text strings of various lengths. 

![Image of 311 Drop Columns](https://github.com/GyanwaliEliza/Finalproject/blob/main/311_Drop_Columns.png)

- Median Family Income (MFI) and population data for the greater Austin metropolitan area was imported from data.census.gov. Data from these new tables were dropped and joined until the following joined_df DataFrame was created:

![Image of Census Data](https://github.com/GyanwaliEliza/Finalproject/blob/main/Census_Data.png)

- The joined_df and training_df DataFrame were then joined on the "ZipCode" column to create a new training_df with the Austin census data with "MedianFamilyIncome" and "TotalPopulation" columns. 
- Our last preprocessing step was to assign descriptors to the Median Family Income data points. 80% of the median family income was $57,260 and 120% of the median family income was $85,891. The descriptors in the "MedianFamilyIncome" column were transformed as such: <80% MFI = Below Median, 80%-120% MFI = Median, >120% MFI = Above Median. 
- The final training DataFrame used for the machine learning model was as follows:

![Image of Final Dataframe](https://github.com/GyanwaliEliza/Finalproject/blob/main/Final_Training_DataFrame.png)

### Preliminary Feature Engineering and Selection
- Please refer to the file "MachineLearningModel_Seg1.ipynb" for the full scope and code of the feature engineering/selection process. 
- Using a practice sub-dataset from the larger 311 Public Data with only the first 1000 rows, the machine learning model was run to gather preliminary outcomes. 
- Feature importances were provided by the fitted attribute ".feature_importances_", which computes the features as the mean and standard deviation of the accumulation of the impurity decrease within each decision tree of Balanced Random Forest Classifier. Features with high importance can be considered significant enough to improve the accuracy of the machine learning model. 
- The following feature columns consistently had negligible feature importance values and were removed from the final DataFrame:
  - Service Request (SR) Number: 
    - An arbitrary number assigned to each 311 ticket.
  - Map Page + Map Tile + State Plane X Coordinate + State Plane Y Coordinate + Latitude Coordinate + Longitude Coordinate + (Latitude.Longitude) + SR Location: 
    - These location data vary for every single ticket and the number of potential variables meant they all negatively impacted the model accuracy. 
    - The inclusion of these variables significantly increased the script run time and often required more RAM than was available.
  - Street Number + Street Name:
    - Similar to the location data, these number of potential variables negatively impacted the model accuracy. 

### Train, Test, Split
![Image of Train, Test, Split](https://github.com/GyanwaliEliza/Finalproject/blob/main/Train_Test_Split.png)
- Using the scikit-learn "train_test_split" module, the final DataFrame was split into random train and test subsets that could then be input into the Balanced Random Forest Classifier model

### Explanation of Model Choice
- We wanted to use a Balanced Random Forest Classifier for our machine learning model since they run efficiently on extremely large datasets. These algorithms are also robust to nonlinear data and can handle large numbers of input variables without deletion.
- Then main disadvantage of Random Forest algorithms is that they cannot accurately extrapolate new data for regression problems. They can only make classification predictions that are bound by the highest and lowest labels in the training data. For our project, the machine learning model would likely fall apart for ticket response times longer than 1 year since this was the upper bound we created for the DataFrame. 

### Model Training
- The original training for this model can be found in the file "MachineLearningModel_Seg1.ipynb". The same Austin 311 dataset was used for this training, albeit with far less preprocessing and feature engineering. At this point, we were only training the model on "Open" vs. "Closed" 311 tickets and the result was 93% accuracy. This was a good benchmark indicating the Balanced Random Forest Classifier was a good selection for even more complex modeling. 
- Our next iteration for the model was looking at our chosen project question of predicting fast vs. slow 311 call response times. After running the model several times, we were presented with an unrealistic 100% accuracy score. We then realized we had to drop the "Total Seconds" column because it was so intricately linked to the "Response Time" column. After this correction, our model has achieved a more realistic accuracy score while still achieving our project goals. 
- Future model training would hopefully include 311 call data for more years than 2019, but we are still limited by the processing power of our computers to add that additional data. 

### Accuracy Score
- The current accuracy score for our machine learning model is 75%.

![Image of Accuracy Score](https://github.com/GyanwaliEliza/Finalproject/blob/main/Accuracy_Score.png)

- The model also has well balanced precision and recall scores for both "Quick Response" and "Slow Response" calls, with an average score of 75% each. 

![Image of Classification Report](https://github.com/GyanwaliEliza/Finalproject/blob/main/Classification_Report.png)

- Overall, this model has adequate predictive power for future 311 call data but has room for improvements with further feature engineering. 

## Recommendations
At the end of the project, we have several recommendations to deepen the analysis. 
1. Collect better service delivery data.
  - Currently the analysis lacks depth in what a "Closed" service request means. For some departments, this could mean that a resident's recycling or trash was picked up. For others, this could mean simply that the complaint was logged within another database. This discrepancy in staff-time or resources is likely to be one of the major factors in the total response time, and also in making the analysis actionable for the City of Austin. With this additional detail it would both deepen the analysis, as well as provide another layer of prediction regarding department staff and resource needs.
2. Add dimension of “Past Investment” in zip codes
  - One of the major missing pieces in the analysis is additional Zip Code data. The census data was added relatively late in the project, and does point to some level of relationship between Zip Code and request volume. Across all of the years of the dataset, the Zip Codes with the largest request volumes remained largely consistent. Additional analysis on what already exists, or has been spent within these neighborhoods could provide additional detail to understand if, for example, there is a relationship betweeen development and 311 requests, or past investment in the form of capital improvements and 311 requests.
3. More granular analysis on households making requests, or those who receive Code Enforcement complaints
  - This was a major factor we would've liked to include, but did not have the time or resources to add for this project. In the early planning of the project, we discussed possibly using home values, or other real estate factors, as well as their change over time, to get at changing Zip Code characteristics. However, the real estate data was largely behind paid APIs. One very labor-intensive idea would be to pair street address logs with the Travis County Appraisal data. Currently, the model seeks to use Zip Code Median Family Income as a proxy, however this does not account for neighborhood-to-neighborhood, or even home-to-home differences.
4. Geographic or other Zip Code grouping categories to account for historical and additional context missed by the model
  - This recommendation connects back to #2. Additional historical context regarding these Zip Codes would help to explain the on-the-ground reality that drives these requests. In Austin, and every other major American city, there is a long history that informs the way our city looks today. From the 1928 Master Plan which intentionally segregated Austin, to the construction of Interstate 35 through the middle of the city, and into major City planning documents in the 1950s and 1980s, the City government and private actors have made active decisions which have resulted in the Austin we see today. Including some dimension of this, whether it be in "Current or Past Industrial Zoning", or "East v. West", or "Gentrifying or Not", will serve to ensure this anaysis does not work ahistorically. 


## Communication
#### Communication done in Slack & in breakout rooms during class time. 

## Dashboard

##### See the following link to look over our plan for our Dashboard https://docs.google.com/presentation/d/1T07JbTtME6sN6u1_7qYxOGOlqq0GUWqQy0iJ8UzBmO8/edit#slide=id.p

## Group
#### Brandon: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Jordan: https://github.com/GyanwaliEliza/Finalproject/tree/jordan_branch
#### Mateo: https://github.com/GyanwaliEliza/Finalproject/tree/Mateo_Branch
#### Eliza: https://github.com/GyanwaliEliza/Finalproject/tree/eliza_branch
