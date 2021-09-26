import React from 'react';
import { ProgressBoundary, ProgressStatus } from './styles';

const ProgressBar = ({ percent }) => {
    return (
        <ProgressBoundary>
            <ProgressStatus style={{ width: `${percent}%` }}>{percent}%</ProgressStatus>
        </ProgressBoundary>
    );
};

export default ProgressBar;
