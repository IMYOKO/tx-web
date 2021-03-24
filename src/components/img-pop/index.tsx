import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { createPortal } from 'react-dom';
import './index.less';
import { RootState } from '@/types/common';

const ImgPop: React.FC = () => {
  const { imgPopVisible, imgPopData } = useSelector((state: RootState) => state.COMMON);
  const dispatch = useDispatch();
  const hideImgPop = () => {
    dispatch({
      type: 'COMMON/save',
      payload: {
        imgPopVisible: false,
        imgPopData: '',
      },
    });
  };
  useEffect(() => {
    return () => {
      hideImgPop();
    };
  }, []);
  return createPortal(
    <>
      {imgPopVisible && (
        <div className="img-pop">
          <div className="img-wrapper">{imgPopData && <img src={imgPopData} alt="" />}</div>
          <div className="img-bg" onClick={hideImgPop}></div>
        </div>
      )}
    </>,
    document.body,
  );
};

export default ImgPop;
