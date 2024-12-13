import { useState } from 'react';
import LanguageProg from './components/LanguageProg';
import { LanguageType } from './types/languageKey.type';
import CodeEdit from './components/CodeEdit';
import Output from './components/Output';
import { OutputType } from './types/types';

const App = () => {
    const [language, setLanguage] = useState<LanguageType>(
        (localStorage.getItem('language') as LanguageType) || 'Python'
    );
    const [output, setOutput] = useState<OutputType>();
    console.log(output, 'output');
    return (
        <div>
            <h1 className='df jcc'>Editor</h1>
            <div className='df aic jcc lan'>
                <strong>Языки:</strong>
                <LanguageProg
                    selected={language}
                    onChange={(e: LanguageType) => {
                        setLanguage(e);
                        localStorage.setItem('language', e);
                    }}
                />
            </div>
            <CodeEdit language={language} data={data => setOutput(data)} />
            <Output output={output} />
        </div>
    );
};

export default App;
