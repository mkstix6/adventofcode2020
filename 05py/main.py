# Function version
# def countUniqueLetters(groupString):
# 	return len(set([char for char in groupString]))
# Lambda version
countUniqueLetters = lambda groupString : len(set([char for char in groupString]))

##########

# Import file data

# Put groups into array.

####### For each group #####
# 
groupString = 'aabccd'

print(countUniqueLetters(groupString))
