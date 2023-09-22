
# deployed Website url
https://casualfunnel-quiz.netlify.app/


# demo video

https://github.com/himanshugoyal77/casuelFunnel-Quiz/assets/92782099/127e95fd-8fb6-4418-86fd-ba4dee8db20b

# overview
this is a quiz application with all the features. User need to enter their name and email address to start. Once the quiz start a 30 minutes timer will be started. user will get 15 questions that need to solved in 30 minutes. if the timer ends the quiz will auto submited. oOnce the user finish the quiz he will be redirected  to dashboard page where he's overall score will be displayed. Also user can see correct answers and check which questions he answered were incorrect. Also based on result a siggestion will be given to the user

# Approach
The website is made with **React.js** and **tailwindCss**
For state management I have used **useContext API**
and for modals and drawer I hav used **Antd Components**
Also for Animations **Lottie animations** are used

The website is fully **mobile responsive**
i have expalined detailed approach in my code through comments

# Setup and Installation
1. npm install
2. npm run dev
   the website will be live on http://127.0.0.1:5173/

# problems faced
the selected option of the user was not persistant. i.e. when I choose option A of question 1, for question 2 also option A was selected directly. Also I was unable to track the previously marked questions.

I tackled it by using and Object data structure. I stored index of the question as Key and marked options as its value. 
const optionsHistory = {
   1: A,
   2: B,
   3: D
}
this also helped to compare the chosen option is correct or not.
I made an array of  correct options,
const correctAns = [A, B, A, D ];
 and cpmpared it with the optionsHistory Object.
 optionsHistory[i] == correctAns[i] then +1/correct else incorrect.
