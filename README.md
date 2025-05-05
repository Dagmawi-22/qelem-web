# qelem 
![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

A SvelteKit app that converts static PDFs into:
- Interactive quizzes ✏️
- Customizable exams 📝
- Anki-compatible flashcard decks 🗂️
- Structured study guides 📚

**Backend Companion**: [pdf-learning-ui](https://github.com/Dagmawi-22/qelem-web-api) (NestJs + PgSql)

## Table of Contents
- [Features](#-features)
- [Installation](#-installation)
- [Contributing](#-contributing)
- [License](#-license)

## Features

### PDF Processing
##### 
- The user uploads a PDF document containing learning material.

- Input Parameters
    The user specifies:

- Maximum number of questions desired

- Difficulty level (easy, medium, or hard)

- Content type: flashcards or exam

- Content Extraction
 The system extracts raw text from the PDF.

- Content Generation via Gemini API
The extracted content is sent to the Gemini API to generate either:

 A deck of flashcards, or

 A structured set of exam questions

 Output Formatting & Saving
 The generated content is formatted in a predefined structure and saved as a JSON file.

 Download/Return Result
 The final output file is returned to the user for access.

### Social Sharing
##### 
- The user generates the desired learning content (exam or deck of cards).

- The user selects a social platform to share to from frontend or copy the content link & shares it to others.

- Api will return the specific content parsing it from the shared url.

### To be added:
   - Adding popular pdf materials
   - Progress tracking for a user
   - Study scheduler & with notifications
   - Personalization of learning content & studying user behaviour

## ⚙️ Installation (Docker)
 ### Clone the repository
```bash
     git clone https://github.com/Dagmawi-22/qelem-web.git ```
     cd qelem-web-api
```
 ### Create a .env file if it doesn't exist based on .env.example:
```bash
    VITE_API_BASE_URL=http://localhost:8000/api/v1
```
 ### Start the application with Docker:
```bash
    docker-compose up --build
```

### 🤝 Contributing
##### Contributions are welcome! If you have ideas for improvements, bug fixes, or new features, feel free to fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you’d like to add.

### 🔒 License
##### Do whatever you want with it — learn from it, build on it, break it, remix it. Just don’t be shady. A little credit is always appreciated. ✌️

