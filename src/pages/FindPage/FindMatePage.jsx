import React, { useEffect } from 'react';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Banner from '../../components/FindPage/Banner';
import StepCircle from '../../components/FindPage/StepCircle';
import { useDispatch, useSelector } from 'react-redux';
import SituationSelectScreen from '../../screen/FindPage/SituationSelectScreen';
import ContentSelectScreen from '../../screen/FindPage/ContentSelectScreen';
import NormalSituationScreen from '../../screen/FindPage/Situation/NormalSituationScreen';
import SpecificSituationScreen from '../../screen/FindPage/Situation/SpecificSituationScreen';
import { TYPES as StepTYPES, resetStepState } from '../../states/StepState';
import { resetNormalState } from '../../states/NormalSituationState';
import { resetSpecificState } from '../../states/SpecificSituationState';
import { TYPES as ContentTYPES, setContent } from '../../states/ContentState';

const FindMatePage = () => {
  const dispatch = useDispatch();
  const { nowStep, secondStep } = useSelector((state) => {
    return state.StepState;
  });

  /** find-result page를 거치게 된 경우
   * 1. state에 오류가 있어 다시 navigate를 통해 오게 되었거나
   * 2. find-result page가 정상적으로 끝나고 다시 친구 찾기를 시도하는 경우
   * 이 때, 기존의 state를 초기화한다.
   */
  useEffect(() => {
    if (nowStep === 4) {
      dispatch(resetStepState());
      dispatch(resetNormalState);
      dispatch(resetSpecificState());
      dispatch(setContent(ContentTYPES.nil));
    }
  }, [nowStep, dispatch]);

  return (
    <MaxWidthWrapper className='pb-10 bg-background font-pre'>
      <Banner title={'밥 친구를 찾으러 가 볼까요?'}>
        <StepCircle step={nowStep} />
      </Banner>
      {nowStep === 1 && <SituationSelectScreen />}
      {nowStep === 2 &&
        (secondStep === StepTYPES.normal ? (
          <NormalSituationScreen />
        ) : (
          <SpecificSituationScreen />
        ))}
      {nowStep === 3 && <ContentSelectScreen />}
    </MaxWidthWrapper>
  );
};

export default FindMatePage;
