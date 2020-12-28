import React, { useState } from 'react';
import { Modal } from 'antd-mobile';
import { difference } from 'lodash-es';
import './index.less';

interface TagListModalProps {
  visible: boolean;
  tagList: string[];
  activeTagList: string[];
  onOK: (tagList: string[]) => void;
  hideModal: () => void;
}

const TagListModal: React.FC<TagListModalProps> = props => {
  const { onOK, visible, activeTagList, tagList, hideModal } = props;
  const [selectTagList, setSelectTagList] = useState<string[]>(activeTagList);

  const hasTag = (tag: string): boolean => {
    return selectTagList.some(t => t === tag);
  };

  const handleClick = (tag: string) => {
    const hasTagFlg = hasTag(tag);
    const list = hasTagFlg ? difference(selectTagList, [tag]) : [...selectTagList, tag];
    setSelectTagList(list);
  };

  const footer = [
    {
      text: '取消',
      onPress: () => {
        hideModal();
        setSelectTagList(activeTagList);
      },
    },
    {
      text: '确定',
      onPress: () => {
        onOK(selectTagList);
        hideModal();
      },
    },
  ];

  return (
    <Modal visible={visible} transparent maskClosable={false} title="请选择标签" footer={footer}>
      <div className="tag-list-modal">
        <ul className="tag-list-modal-wrapper">
          {tagList.map(tag => (
            <li key={tag}>
              <span
                className={hasTag(tag) ? 'select' : ''}
                onClick={() => {
                  handleClick(tag);
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default TagListModal;
