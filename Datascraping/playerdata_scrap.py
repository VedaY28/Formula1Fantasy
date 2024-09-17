from bs4 import BeautifulSoup
import pandas as pd
import requests 
import time

all_plays = [] ## list to store all teams

html = requests.get('https://www.4mula1stats.com/2024').text ##getting the html from the website
soup = BeautifulSoup(html, 'lxml')
table = soup.find_all('table', class_ = 'table')[0] ##only want the first table, therefore the first index

links = table.find_all('a') ## finding all links in the table 
links = [l.get("href") for l in links] ##parsing through links
links = [l for l in links if '/driver' in l] ##filtering through links to only get squads

play_urls = [f"https://www.4mula1stats.com{l}" for l in links] ## formatting back to links

# print(team_urls)
# i = 0

for play_url in play_urls:
    play_name = play_url.split("/")[-1].capitalize().replace('-', ' ').replace('_', ' ')
    play_name = ' '.join(word.capitalize() for word in play_name.split())
    
    # i += 1
    # print(play_name)
    
    data = requests.get(play_url).text
    # print(data)
    soup = BeautifulSoup(data, 'lxml')
    stats = soup.find_all('table', class_ = 'table')[3]

    # print(stats)
    if stats and stats.columns: stats.columns = stats.columns.droplevel() ##formatting the stats

    # Assuming 'play_data' is a BeautifulSoup Tag
    # Convert it into a DataFrame
    play_data = pd.read_html(str(stats))[0]
    play_data["Player"]= play_name
    all_plays.append(play_data) ## appending the data
    time.sleep(5) ## making sure we don't get blocked from scraping by delaying each loop by 5 seconds

stat_df = pd.concat(all_plays) ## concatenating all of the stats
stat_df.fillna(0, inplace=True)
columns = ['Player'] + [col for col in stat_df.columns if col != 'Player']
stat_df = stat_df[columns]
stat_df = stat_df[stat_df["Teammate(s)"] != 0]
# print(stat_df)
stat_df.to_csv("playerstats.csv", index=False) ## importing to csv