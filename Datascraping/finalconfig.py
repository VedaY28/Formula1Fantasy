import pandas as pd

dataset1 = pd.read_csv('playerstats.csv') 
dataset2 = pd.read_csv('f1stats.csv') 

# Step 1: Expand dataset2 so that each driver is in its own row
# Split the 'Driver(s)' column into individual drivers
dataset2_expanded = dataset2.copy()
dataset2_expanded['Driver(s)'] = dataset2_expanded['Driver(s)'].str.split(',')  # Split the driver(s) column

# Explode the dataset so that each driver has its own row
dataset2_expanded = dataset2_expanded.explode('Driver(s)').rename(columns={'Driver(s)': 'Driver'})

# Step 2: Create a lookup table (dictionary) from the expanded dataset2
lookup_table = dataset2_expanded.set_index(['Driver', 'Season'])['Team'].to_dict()

def get_team(row):
    return lookup_table.get((row['Driver'], row['Season']), 'Unknown')  # 'Unknown' if no match found

dataset1['Team'] = dataset1.apply(get_team, axis=1)

cols = list(dataset1.columns)
cols.insert(cols.index('Season'), cols.pop(cols.index('Team'))) 
dataset1 = dataset1[cols] 

dataset1.to_csv('final.csv', index=False)

print("Team Column Added")
