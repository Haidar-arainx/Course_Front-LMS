import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { type } from '@testing-library/user-event/dist/type';

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const NewTextEditor = ({ labelName, fieldName, HandleEditor, desc, ref }) => {
  return (
    <>
      <label htmlFor="ABC">{labelName}</label>
      <ReactQuill
        id="ABC"
        theme="snow"
        defaultValue={desc ?? ''}
        value={desc ?? ''}
        onChange={(val) => {
          HandleEditor(fieldName, val);
        }}
        modules={quillModules}
        formats={quillFormats}
        ref={ref}
      />
    </>
  );
};
export default NewTextEditor;
