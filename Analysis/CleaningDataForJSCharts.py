# Import dependencies
import pandas as pd

# Import data
df = pd.read_csv('Analysis/Data/yr2010_present_clean.csv', index_col=[0])

# Prepare data
cause_pie_df = df[['CAUSE', 'REPORT_NUMBER']].groupby(['CAUSE']).count()

# Export to JSON
cause_pie_df.to_json('cause_pie_chart.json')