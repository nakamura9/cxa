import os 
import re
from collections import namedtuple, deque
import time 
import datetime 
import json 
import nltk

import statistics

Message = namedtuple("Message", "date time name message")
word_set = set()

def get_words():
    with open('words.txt', 'r') as f:
        for line in f:
            word_set.add(line.strip().lower())

def get_messages(filename):
    messages = deque()
    with open(filename, 'r', errors='replace') as f:
        lines = f.readlines()
        for line in lines:
            messages.append(parse_line(line))

    return messages

def parse_line(line):
    # use regular expression to split s into a date, time, name and message
    regex = re.compile(r"(\d{4}/\d{2}/\d{2}), (\d{2}:\d{2}) - (.*): (.*)")
    match = regex.match(line)
    if match:
        return Message(match.group(1), match.group(2), match.group(3), match.group(4))
    return None

    # number of messages caleb vs althea
    # average message length 
    # average messages per day
    # distribution of messages by time 
    # number of unique words 
    # word frequency excluding stop words 

def number_of_messages(messages):
    caleb =  althea = 0 
    for msg in messages:
        if not msg: continue
        if msg.name == "Caleb":
            caleb += 1
        else:
            althea += 1

    return caleb, althea


def average_message_length(messages):
    caleb = althea = 0
    caleb_count = althea_count = 0
    for msg in messages:
        if not msg: continue
        if msg.name == "Caleb":
            caleb += len(msg.message.split(' '))
            caleb_count += 1
        else:
            althea += len(msg.message.split(' '))
            althea_count += 1

    return caleb / (caleb_count or 1), althea / (althea_count or 1 )

def average_messages_per_day(messages):
    map = {}
    for msg in messages:
        if not msg: continue 
        map[msg.date] = map.get(msg.date, 0) + 1

    return map, statistics.mean(map.values())

def average_messages_per_hour(messages):
    map = {}
    for msg in messages:
        if not msg: continue
        t = msg.time.split(":")[0]
        map[t] = map.get(t, 0) + 1


    return map, statistics.mean(map.values()) 



def number_of_unique_words(messages):
    unique_words = set()
    unique_words_caleb = set()
    unique_words_althea = set()
    word_frequency = {}
    stop_words = set(nltk.corpus.stopwords.words('english'))
    for msg in messages:
        if not msg: continue
        caleb = msg.name == "Caleb"
        for word in msg.message.split():
            if word in word_set and word not in stop_words:
                word_frequency[word] = word_frequency.get(word, 0) + 1
                unique_words.add(word)
                if caleb:
                    unique_words_caleb.add(word)
                else:
                    unique_words_althea.add(word)

    
    return unique_words.__len__(), word_frequency, unique_words_caleb.__len__(), unique_words_althea.__len__()

def main():
    get_words()
    msg = get_messages("merged.txt")
    stats = {}
    stats['msg_count'] = msg.__len__()
    stats['unique_words'], stats['word_frequency'], stats['unique_caleb'], stats['unique_althea'] = number_of_unique_words(msg)
    stats['avg_msg_length'] = average_message_length(msg)
    stats['avg_msg_per_day'], stats['avg_msg_per_day_mean'] = average_messages_per_day(msg)
    stats['avg_msg_per_hour'], stats['avg_msg_per_hour_mean'] = average_messages_per_hour(msg)
    stats['msg_count'] = number_of_messages(msg)

    with open('stats.json', 'w') as f:
        json.dump(stats, f, indent=4)

if __name__ == "__main__":
    main(),