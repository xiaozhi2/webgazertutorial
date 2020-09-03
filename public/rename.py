import os
import glob
files = glob.glob('public/img/FoodImages/*.jpg')
#print(files)
#print(type(files))
print((range(len(files))[1]))
for file in range(len(files)):
    new_name = 'public/img/FoodImages/foodStimulus_{}.jpg'.format((range(len(files))[file])) 
    os.rename(files[file], new_name)
