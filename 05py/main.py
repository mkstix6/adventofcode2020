inputFile = 'day5-puzzle-data.txt'
# inputFile = 'example-data.txt'


def countStringUniqueLetters(groupString): return len(
    set([char for char in groupString]))


# Import puzzle file data
with open(inputFile) as f:
    allData = f.readlines()

# Create array of each group's answers
groups = []
group = ''
for x in range(len(allData)):
    person = allData.pop(0)
    person = person.strip('\n')
    if person == '':
        if group != '':
            groups.append(group)
            group = ''
    else:
        group += person
    if len(allData) == 0:
        groups.append(group)

# Count total unique yes answers from each group
totalYesAnswers = 0
for g in groups:
    totalYesAnswers += countStringUniqueLetters(g)

# Print puzzle-day-05a answer
print(totalYesAnswers)
