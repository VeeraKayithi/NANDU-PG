import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputFolder = path.resolve(
  "src/assets"
);

const outputFolder = path.resolve(
  "src/assets/optimized"
);

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, {
    recursive: true,
  });
}

const supportedExtensions = [
  ".jpg",
  ".jpeg",
  ".png",
];

const files = fs.readdirSync(
  inputFolder
);

for (const file of files) {
  const extension =
    path.extname(file).toLowerCase();

  if (
    !supportedExtensions.includes(
      extension
    )
  ) {
    continue;
  }

  const inputPath = path.join(
    inputFolder,
    file
  );

  const filename =
    path.basename(
      file,
      extension
    );

  const outputPath = path.join(
    outputFolder,
    `${filename}.webp`
  );

  try {
    const beforeSize =
      fs.statSync(inputPath).size;

    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 5,
      })
      .toFile(outputPath);

    const afterSize =
      fs.statSync(outputPath).size;

    const beforeMB = (
      beforeSize /
      1024 /
      1024
    ).toFixed(2);

    const afterKB = (
      afterSize / 1024
    ).toFixed(0);

    const reduction = (
      (1 -
        afterSize /
        beforeSize) *
      100
    ).toFixed(0);

    console.log(
      `${file}: ${beforeMB} MB → ${afterKB} KB (${reduction}% smaller)`
    );
  } catch (error) {
    console.error(
      `Failed: ${file}`,
      error.message
    );
  }
}

console.log(
  "\nImage optimization complete."
);