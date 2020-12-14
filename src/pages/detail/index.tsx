import { connect } from 'dva';
import React, { useEffect } from 'react';

interface DetailProps {
  aaa: string;
}

const Detail: React.FC<DetailProps> = props => {
  const { aaa } = props;
  const { hash = '' } = location;
  const search = hash.split('?').pop();
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');

  useEffect(() => {
    console.log({ id });
    return () => {};
  }, [id]);

  return <div className="detail-page">Detail{aaa}</div>;
};

const mapStateToProps = (state: any) => {
  const {
    DETAIL: { aaa },
  } = state;
  return { aaa };
};

export default connect(mapStateToProps)(Detail);
