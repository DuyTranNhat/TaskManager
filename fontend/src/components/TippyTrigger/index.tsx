import { forwardRef } from 'react';

type TippyTriggerProps = {
    children: React.ReactNode;
};

const TippyTrigger = forwardRef<HTMLDivElement, TippyTriggerProps>(({ children }, ref) => {
    return <div ref={ref as React.Ref<HTMLDivElement>}>{children}</div>;
});

export default TippyTrigger;
