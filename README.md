# Generative Designs

A static collection of generative-art, audio, image-processing, and machine-learning demos.

## Project structure

- `index.html` is the site landing page.
- `pages/` contains the individual demos and references page.
- `assets/css/` contains site-wide and shared experiment-page styles.
- `assets/js/` contains shared helpers, sketch mounting and page interactions, named demo sketches, and experiments.
- `assets/vendor/p5/` contains the locally bundled p5.js libraries.
- `assets/icons/`, `assets/images/`, and `assets/audio/` contain the site media.

Experiment pages share the same navigation, sketch stage, interaction area, and explanatory sections. Each page links to its sketch and supporting libraries directly; the site does not currently use a build step.
