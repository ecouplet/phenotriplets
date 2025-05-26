# Triplet Annotation App

This is a simple web-based tool for triplet-based image annotation. Annotators are presented with three images at a time:

* A **reference** image
* Two **options**

They are asked to choose which of the two options is more similar to the reference, or mark the triplet as "not sure".

## Features

* Clean UI for image triplet annotation
* Keyboard-free annotation: uses clickable buttons
* Ability to go back and correct previous annotations
* Results are stored in a Google Sheet via Google Apps Script
* Deployed using GitHub Pages or Netlify

## Folder Structure

```
project-root/
├── index.html        # Main HTML file
├── script.js         # Application logic
├── style.css         # Stylesheet
├── triplets.json     # List of image triplets
└── images/           # Directory containing images used in the triplets
```

## Setup Instructions

### 1. Prepare Triplets

* Add your image files to the `images/` folder
* Create a `triplets.json` file listing triplets as objects with `reference`, `option1`, and `option2`

Example `triplets.json`:

```json
[
  {
    "reference": "images/img001.jpg",
    "option1": "images/img002.jpg",
    "option2": "images/img003.jpg"
  }
]
```

### 2. Configure Google Apps Script (for logging responses)

We'll use Google Apps Script to send annotation responses to a Google Sheet. This will be configured in the next step.

### 3. Deploy the App

You can deploy this app via:

* **GitHub Pages** (recommended if you're already using GitHub)
* **Netlify** (easiest automatic deployment and custom domain support)

> Make sure all images and files are in your GitHub repo and paths are correct in `triplets.json`.

## Usage

1. Annotator enters their name.
2. Images are displayed in sets of three.
3. Annotator selects one of the two options, or chooses "Not sure".
4. Annotations are automatically logged to your connected Google Sheet.
5. Annotator can click ⬅ "Back" to correct the previous annotation.

## Next Steps

* [ ] Set up Google Apps Script backend to collect annotations
* [ ] Deploy using GitHub Pages

---

For any questions or improvements, feel free to open an issue or contribute to the repo!

