# import dependencies
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# import data
df = pd.read_csv('Analysis/Data/yr2010_present_clean.csv')


# descriptive statistics of barrels spilt and incident cost
barrels_summary = df['TOTAL_BBLS_RELEASED'].describe()
print(f'Descriptive statistics about the barrels released during incident.\n {barrels_summary} \n')

cost_summary = df['TOTAL_EST_COST'].dropna().describe()
print(f'Descriptive statistics about the cost of the incident.\n {cost_summary}')


# finding precentages of incidents with injuries, fatalities, and water contamination
injury_percent = df['INJURY_IND'].loc[df['INJURY_IND'] == 'YES'].count() / df['INJURY_IND'].count()
print(f'Incidents with injuries: {injury_percent:.2%}')

fatal_percent = df['FATALITY_IND'].loc[df['FATALITY_IND'] == 'YES'].count() / df['FATALITY_IND'].count()
print(f'Incidents with fatalities: {fatal_percent:.2%}')

water_contam_percent = df['WATER_CONTAM_IND'].loc[df['WATER_CONTAM_IND'] == 'YES'].count() / df['WATER_CONTAM_IND'].count()
print(f'Incidents with water contamination: {water_contam_percent:.2%}')


# What was water contaminated with?
water_contam_df = df[['COMMODITY_RELEASED_TYPE', 'WATER_CONTAM_IND'
                     ]].loc[(df['WATER_CONTAM_IND'] == 'YES')].groupby(['COMMODITY_RELEASED_TYPE']).count()
print(water_contam_df)


# percentages for all categories of pressure 
pressure_not_exceed_percent = df['ACCIDENT_PRESSURE'].loc[df['ACCIDENT_PRESSURE'] == 'PRESSURE DID NOT EXCEED MOP'].count() / df['ACCIDENT_PRESSURE'].count()
print(f'Incidents where pressure did not exceed max operating pressure: {pressure_not_exceed_percent:.2%}')

pressure_not_exceed_oneten_percent = df['ACCIDENT_PRESSURE'].loc[df['ACCIDENT_PRESSURE'] == 'PRESSURE EXCEEDED MOP, BUT DID NOT EXCEED 110% OF MOP'].count() / df['ACCIDENT_PRESSURE'].count()
print(f'Incidents where pressure did exceed max operating pressure but not 110% of max operating pressure: {pressure_not_exceed_oneten_percent:.2%}')
      
pressure_exceed_percent = df['ACCIDENT_PRESSURE'].loc[df['ACCIDENT_PRESSURE'] == 'PRESSURE EXCEEDED 110% OF MOP'].count() / df['ACCIDENT_PRESSURE'].count()
print(f'Incidents where pressure exceeded 110% of max operating pressure: {pressure_exceed_percent:.2%}')

# Create a table of the percentage data
table_df = pd.DataFrame({
    "Injuries": f'{injury_percent:.2%}',
    "Fatalities": f'{fatal_percent:.2%}',
    "Water Contamination": f'{water_contam_percent:.2%}',
    "Pressure did not Exceed Max": f'{pressure_not_exceed_percent:.2%}',
    "Pressure Exceeded Max but not 110% of Max": f'{pressure_not_exceed_oneten_percent:.2%}',
    "Pressure Exceeded Max": f'{pressure_exceed_percent:.2%}'}, index=['Percentage'])
table_df

# Group_by cause and create boxplots of cost
# Remove outliers
df = df.loc[df['TOTAL_EST_COST'] < 1000000]

# Separating data and converting into series
corrosion_cost_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='CORROSION FAILURE']
corrosion = corrosion_cost_df['TOTAL_EST_COST'].squeeze()
equipment_cost_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='EQUIPMENT FAILURE']
equipment = equipment_cost_df['TOTAL_EST_COST'].squeeze()
excavation_cost_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='EXCAVATION DAMAGE']
excavation = excavation_cost_df['TOTAL_EST_COST'].squeeze()
incorrect_op_cost_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='INCORRECT OPERATION']
incorrect_op = incorrect_op_cost_df['TOTAL_EST_COST'].squeeze()
material_fail_cost_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='MATERIAL FAILURE OF PIPE OR WELD']
material_fail = material_fail_cost_df['TOTAL_EST_COST'].squeeze()
natural_damage_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='NATURAL FORCE DAMAGE']
natural_damage = natural_damage_df['TOTAL_EST_COST'].squeeze()
other_incident_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='OTHER INCIDENT CAUSE']
other_incident = other_incident_df['TOTAL_EST_COST'].squeeze()
outside_force_damage_df = df[['CAUSE', 'TOTAL_EST_COST']].loc[df['CAUSE']=='OTHER OUTSIDE FORCE DAMAGE']
outside_force_damage = outside_force_damage_df['TOTAL_EST_COST'].squeeze()

# Make Boxplot
x_labels = ["CORROSION FAILURE", "EQUIPMENT FAILURE","EXCAVATION DAMAGE", 'INCORRECT OPERATION', 'MATERIAL FAILURE OF PIPE OR WELD', 'NATURAL FORCE DAMAGE', 'OTHER INCIDENT CAUSE', 'OTHER OUTSIDE FORCE DAMAGE']
cause_cost_data = [corrosion, equipment, excavation, incorrect_op, material_fail, natural_damage, other_incident, outside_force_damage]

fig, ax = plt.subplots(figsize=(12, 8))
ax.set_title('Incident Costs After 2010 by Their Cause',fontsize=20)
ax.set_ylabel('Cost of Incident',fontsize=16)
ax.set_xlabel("Incident Causes",fontsize=16)
ax.boxplot(cause_cost_data, labels=x_labels, showfliers=False, showmeans=True, 
           medianprops={"color": "blue", "linewidth": 1})
plt.xticks(rotation=60)
ax.grid()
plt.show()

# Create buckets of timeframes and compare boxplots of cost
# Prepare Data
cost_df = pd.read_csv('Analysis/Data/cost_per_incident.csv', usecols=[1,2])
cost_df = cost_df.loc[cost_df['TOTAL_COST'] < 1000000]

# Creating 10-year bins
bins = [0, 1971, 1981, 1991, 2001, 2011, 2021]
bins_label = ['Pre-1970', '1971-1980', '1981-1990' , '1991-2000', '2001-2010', '2011-2021']
cost_df['YEAR_RANGE'] = pd.cut(cost_df['Year'], bins, labels=bins_label)

# Separating data and converting into series
pre1970_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='Pre-1970']
pre1970 = pre1970_df['TOTAL_COST'].squeeze()
seventies_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='1971-1980']
seventies = seventies_df['TOTAL_COST'].squeeze()
eighties_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='1981-1990']
eighties = eighties_df['TOTAL_COST'].squeeze()
nineties_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='1991-2000']
nineties = nineties_df['TOTAL_COST'].squeeze()
two_thousands_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='2001-2010']
two_thousands = two_thousands_df['TOTAL_COST'].squeeze()
twenty_tens_df = cost_df[['YEAR_RANGE', 'TOTAL_COST']].loc[cost_df['YEAR_RANGE']=='2011-2021']
twenty_tens = twenty_tens_df['TOTAL_COST'].squeeze()

# Making a boxplot
xlabels = ['Pre-1970', '1971-1980', '1981-1990' , '1991-2000', '2001-2010', '2011-2021']
year_data = [pre1970, seventies, eighties, nineties, two_thousands, twenty_tens]
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_title('Incident Costs by 10-Year Ranges', fontsize=20)
ax.set_ylabel('Cost of Incident', fontsize=14)
ax.set_xlabel('Incident Year', fontsize=14)
ax.boxplot(year_data, labels=xlabels, showfliers=False, showmeans=True)
plt.xticks(rotation=60)
ax.grid()
plt.show()
