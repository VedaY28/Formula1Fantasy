from bs4 import BeautifulSoup
import pandas as pd
import requests 
import time
import re 

all_teams = []  # List to store all teams

html = requests.get('https://www.4mula1stats.com/2024').text  # Getting the HTML from the website
soup = BeautifulSoup(html, 'lxml')
table = soup.find_all('table', class_='table')[0]  # Only want the first table

links = table.find_all('a')  # Finding all links in the table 
links = [l.get("href") for l in links]  # Parsing through links
links = [l for l in links if '/team' in l]  # Filtering to only get team-related links

team_urls = [f"https://www.4mula1stats.com{l}" for l in links]  # Formatting back to full URLs

# Looping through each team URL
for team_url in team_urls: 
    team_name = team_url.split("/")[-1].capitalize()  # Extracting the team name from the URL
    
    data = requests.get(team_url).text
    soup = BeautifulSoup(data, 'lxml')
    stats = soup.find_all('table', class_='table')[3]  # Assuming the stats are in the 4th table

    if stats:
        # Convert the BeautifulSoup table into a pandas DataFrame
        team_data = pd.read_html(str(stats))[0]
        
        # Add the 'Team' column with the team name
        team_data["Team"] = team_name
        
        # If there's a 'Driver(s)' column, remove all kinds of spaces around the commas
        if 'Driver(s)' in team_data.columns:
            # This will remove all spaces around commas, including non-breaking spaces
            team_data['Driver(s)'] = team_data['Driver(s)'].apply(lambda x: re.sub(r'\s*,\s*', ',', x))
        
        # Append the cleaned data to the list
        all_teams.append(team_data)

    time.sleep(5)  # Delaying to avoid being blocked from scraping

# Concatenate all team data into a single DataFrame
stat_df = pd.concat(all_teams)
stat_df.fillna(0, inplace=True)  # Fill missing values with 0

# Ensure 'Team' and 'Driver(s)' columns are at the beginning
columns = ['Team', 'Driver(s)'] + [col for col in stat_df.columns if col not in ['Team', 'Driver(s)']]
stat_df = stat_df[columns]

# Export the DataFrame to a CSV file
stat_df.to_csv("f1stats.csv", index=False)  # Save the file

print("Data has been successfully scraped and saved to f1stats.csv!")
