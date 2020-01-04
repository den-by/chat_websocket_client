interface Props {
    world: string;
}

function hello(props: Props) {
    alert(`Hello, ${props.world}`);
}

hello({ world: 'TypeScript!' });