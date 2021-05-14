import React, { useState, ReactNode, ReactElement } from 'react';
import './App.css';

// convetional props
function Heading({ title }: { title: string }) {
    return <h1>{title}</h1>;
}
function HeadingWithContent({ children }: { children: ReactNode }): ReactElement {
    return <h1>{children}</h1>;
}

// default props
const defaultContainerProps = {
    heading: <strong>my heading</strong>,
};
type ContainerProps = { children: ReactNode } & typeof defaultContainerProps;

function Container({ heading, children }: ContainerProps): ReactElement {
    return (
        <div>
            <h1>{heading}</h1>
            <h1>{children}</h1>
        </div>
    );
}

Container.defaultProps = defaultContainerProps;

// functional props
function TextWithNumber({
    header,
    children,
}: {
    header?: (num: number) => ReactNode;
    children: (num: number) => ReactNode;
}) {
    const [state, setState] = React.useState<number>(1);

    return (
        <div>
            {header && <h2>{header?.(state)}</h2>}
            <div>{children(state)}</div>
            <div>
                <button onClick={() => setState(state + 1)}>Add</button>
            </div>
        </div>
    );
}

// generic
function List<ListItem>({ items, render }: { items: ListItem[]; render: (item: ListItem) => ReactNode }) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{render(item)}</li>
            ))}
        </ul>
    );
}

function App() {
    return (
        <div className="App">
            <Heading title="hello there"></Heading>
            <HeadingWithContent>
                {' '}
                <strong>hey</strong>{' '}
            </HeadingWithContent>

            <Container>foo</Container>
            <TextWithNumber header={(num: number) => <span> header {num}</span>}>
                {(num: number) => <div>number is {num}</div>}
            </TextWithNumber>
            <List items={['jack', 'james', 'king']} render={(item: string) => <div>{item.toLowerCase()}</div>}></List>
        </div>
    );
}

export default App;
