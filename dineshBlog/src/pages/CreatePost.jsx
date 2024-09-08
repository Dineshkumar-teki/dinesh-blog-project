import { Select, TextInput, FileInput, Button } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const CreatePost = () => {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="python">Python</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput type="file" accepts="images/*" />
          <Button type="button" gradientDuoTone="purpleToPink" outline size="sm">
            Upload Image
          </Button>
        </div>
        <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required/>
        <Button type="submit" gradientDuoTone="purpleToPink" className="w-full mb-5" >Publish</Button>
      </form>
    </div>
  );
};

export default CreatePost;
