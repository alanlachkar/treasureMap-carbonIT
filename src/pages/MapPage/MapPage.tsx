// React imports
import { useState } from 'react';
// Component imports
import { TreasureMap } from '../../components/TreasureMap/TreasureMap';

/**
 * MapPage component
 * @returns Page with input to read files and display treasure map according to its content (specific syntax needed)
 */
const MapPage = (): JSX.Element => {
  const [fileContent, setFileContent] = useState<string | undefined>();

  const onChangeFile = (newFile: string): void => setFileContent(newFile);

  return (
    <div>
      <p>Hello Treasure Map !</p>

      <input
        type="file"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          readFile(event, onChangeFile)
        }
      />
      <p>{fileContent}</p>
      <TreasureMap fileContent={fileContent} />
    </div>
  );
};

export default MapPage;

/**
 * Function used to read the selected file from file explorer
 * @param event Event from file explorer
 * @param onChangeFile Function used to get the file's content
 */
const readFile = (
  event: React.ChangeEvent<HTMLInputElement>,
  onChangeFile: (newFile: string) => void
): void => {
  let files: FileList | null = event?.target?.files;
  let reader = new FileReader();
  // Get only one file even if multiple file are selected
  if (files !== null && files[0] !== null) {
    reader.readAsText(files[0]);

    let textFile = /text.*/;

    if (files[0]?.type.match(textFile)) {
      reader.onload = () => {
        onChangeFile(reader.result as string);
      };
    } else {
      alert("It doesn't seem to be a text file we search!");
    }
  }
};
