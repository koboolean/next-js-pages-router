import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";

export default function Index(){

    const router = useRouter();

    const addMeetupHandler = async (enterMeetupData) => {
        const request = await fetch('/api/new-meetup', {
            method : 'POST',
            body : JSON.stringify(enterMeetupData),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const data = await request.json();

        router.push('/');
    }

    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name={"description"} content={"Browse a huge list of highly active React"}/>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </Fragment>
}
