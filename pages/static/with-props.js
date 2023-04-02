export async function getServerSideProps() {
    const data = await fetch('http://localhost:3000/api/hello').then(res => res.json());

    return {
        props: {
            data,
        }
    }
}

export default function About({ data }) {
    return <div> <h1>About ovo {data.name}</h1> </div> 
}