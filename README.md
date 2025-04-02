# 📱 Political Perspectives Chat

## Project Overview

This project hopes to help users gain literacy on the different perspectives on issues that each U.S. political party has.

## Try the App

The app is deployed at https://viewpoint-app.vercel.app/, and this video shows it off <link>

## Followup Prompts Regarding Features, and Cursor Responses

Here are **five feature-related prompts** I gave to Cursor and what happened:

1. **Prompt:** “Remove all API keys and puit them in a .env file”
    
    **Response:** Cursor moved API keys from files and put in a .env, which worked well.
    
2. **Prompt:** “Add accounts to save chats in a database, account authentication. All this done with FireBase”
    
    **Response:** Ran into a bunch of issues with missing properties, and chat functionality stopped working. Lots of manual work in setting up firebase.
    
3. **Prompt:** “Why is the chat no longer responding to my input?”
    
    **Response:** Cursor properly fixed AI chat issue on first attempt.
    
4. **Prompt:** “I want the chat for each political party to be seperate. For example, when I click Democrat I want only my democrat chats but when I press republican I want my republican chats.”
    
    **Response:** Cursor succesfully seperated chats by party tab succesfully.

5. **Prompt:** “Ok great, now I want a button to allow me to select 2 parties to debate back and forth. There should be a stop debate button to stop the debate."
    
    **Response:** This ran into an issue that was really challenging for Cursor to fix. Only one chat was being returned due to a React state managemnet issue. After numerous (10+) new prompts and sending and logging errors Cursor realized and was able to fix the React state issue.

## Followup Prompts Regarding User Interface, and Cursor Responses

Here are **five UI prompts** I gave to Cursor:

1. **Prompt:** “The single chat and debate mode buttons are ugly and not formatted, fix.”
    
    **Response:** Cursor for some reason made the buttons into columsn, but did give them coloring and styling.
    
2. **Prompt:** “Why are the single and debate buttons columns that take up the whole page? Fix that please”
    
    **Response:** Worked well! Cursor fixed the issue and made the buttons looks similar to sliders between the two features.
    
3. **Prompt:** “Format the app title text on the front page to match the theme of the app.”
    
    **Response:** Cursor added title styling that looked more formal, with the added bonus of changing the pages title tag as well.
    
4. **Prompt:** “Conservative should be Republican, change text accordingly.”
    
    **Response:** The text change took effect on each page where it was needed.
    
5. **Prompt:** “The Background is a bit bland, maybe add a American themed styling (red white blue)?”
    
    **Response:** Cursor changed the background color to an impressive American-flag color scheme that looks very sleek. 

## Summary

**Final App Description:**

The final app is allows users not only to chat with the AI about various political topics, but to witness debates about these topics as well. Chats wth the AI are saved to the users account to keep the convesration going between the perspectives. It’s mobile-responsive and deployed on Vercel.

**What I liked about Cursor:**

- Cursor shined when it came to UI changes, and created beautiful stylings from what was originally very bland.
- Cursor was great at getting code and functionality at a rapid pace. Features were implemeneted at very quick speeds.
- Cursor guided in additinoal setup, even in parts (OpenAI, FireBase) where it didn't have direct access.

**Challenges / Issues:**

- Cursor was very bad at solving more difficult issues such as the one involving React states.
- Once Cursor ran into an error it required a lot of prompting to even get it to start the process of identifying the error.
- Cursor repeated itself and removed and added codes in loops once it was stuck, and neede new prompt windows to stop digging itself deeper into the problem it was stuck with.
- Certain issues were identifibale by the console but Cursor didn't always ask to see it.

Overall, this project helped me build a full-stack app quickly. While Cursor is very capable at building a basic structure and making UI tweaks at a rapid pace, once it runs into a more advnaced issue it can get stuck and require direct intervention.