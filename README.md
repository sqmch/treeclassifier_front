# tree classifier - identify a tree with an image of it's leaf

## Built with

- Python (Flask, fastai)
- Vue.js (vue-material)

### Demo: https://treeclassifier.netlify.app/

## About the project

The purpose of this project was to create an image classifier through deep learning and provide it a simple web based frontend for practice. The model was created using the fastai library which sits on top of Pytorch and an inference learner was then exported from the model in order to keep it accessible on a Flask API endpoint for the front-end to access. The data the model was trained on was gathered and processed by myself due to a lack of suitable public datasets. The model is not accurate and conclusive enough for real world use cases and the project should only be used for educational purposes.

