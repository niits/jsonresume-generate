set -euo pipefail

for input_path in resumes/0.json; do
    echo $input_path
    for path in src/themes/*; do
        node src/index.js generate $input_path $(basename $path)
    done

done
# for path in html/*html; do
#     google-chrome \
#         --headless \
#         --disable-gpu \
#         --run-all-compositor-stages-before-draw \
#         --print-to-pdf-no-header \
#         --print-to-pdf=/home/niits/code/jsonresume/${path}.pdf \
#         http://127.0.0.1:5500/${path}
# done
