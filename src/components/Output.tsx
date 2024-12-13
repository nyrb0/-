import { FC, useRef, useState } from 'react';
import s from '../styles/Output.module.scss';
import { OutputType } from '../types/types';

interface OutputProps {
    output?: OutputType;
}

const Output: FC<OutputProps> = ({ output }) => {
    const [height, setHeight] = useState(150);
    const outputRef = useRef<HTMLDivElement>(null);
    const [isOpenOutput, setIsOpenOutput] = useState(true);
    const resizeTerminal = (e: React.MouseEvent) => {
        const startY = e.clientY;
        const startHeight = height;
        const onMouseMove = (e: MouseEvent) => {
            const newHeight = startHeight - (e.clientY - startY);
            setHeight(Math.max(60, Math.min(newHeight, 500)));
        };
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return (
        <>
            {isOpenOutput ? (
                <div className={s.output} style={{ height: `${height}px` }}>
                    <button className={s.x} onClick={() => setIsOpenOutput(false)}>
                        X
                    </button>
                    <div className={s.resizeHandle} onMouseDown={resizeTerminal} ref={outputRef} />
                    <h2>
                        Результат:{' '}
                        <span
                            style={{
                                fontSize: 10,
                                color: output?.status === 'success' ? 'green' : output?.status === 'error' ? 'red' : ''s,
                            }}
                        >
                            {output?.status === 'success' ? 'успешно' : output?.status === 'error' ? 'ошибка' : ''}
                        </span>
                    </h2>
                    <p
                        style={{
                            color: output?.status === 'success' ? '#fff' : output?.status === 'error' ? 'red' : '',
                        }}
                    >
                        {output?.output}
                    </p>
                </div>
            ) : (
                <button className={s.open} onClick={() => setIsOpenOutput(true)} aria-label='Открыть терминал'>
                    🖥️
                </button>
            )}
        </>
    );
};

export default Output;
