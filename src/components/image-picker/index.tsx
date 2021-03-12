import React from 'react';
import { FileDataType } from '@/types/common';
import { fileByBase64 } from '@/utils';
import './index.less';

export interface ImagePickerProps {
  addFiles?: (file: FileDataType) => void;
  fileList: FileDataType[];
  readonly?: boolean;
  removeFile?: (index: number) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = props => {
  const { fileList, addFiles, removeFile = () => {}, readonly = false } = props;
  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      fileByBase64(files[0], addFiles);
    }
  };
  return (
    <div className="image-picker-wrapper">
      <ul className="image-picker-ul">
        {fileList.map(({ base64String }, index) => (
          <li key={index}>
            <div className="image-picker-item">
              <div className="image-picker-box">
                <div className="image-box">
                  {!readonly && (
                    <div className="icon-remove" onClick={() => removeFile(index)}></div>
                  )}
                  {base64String && <img src={base64String} alt="" />}
                </div>
              </div>
            </div>
          </li>
        ))}
        {!readonly && (
          <li>
            <div className="image-picker-item">
              <div className="image-picker-box">
                <div className="image-box">
                  <div className="add-file-box">
                    <input
                      type="file"
                      key={new Date().getTime()}
                      className="add-file"
                      onChange={fileChange}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ImagePicker;
