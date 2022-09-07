
import style from './Contact.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { targetEmail } from '../../_defaultValues';
import { useState } from 'react';

export default function Contact() {
    const [message, setMessage] = useState("");
    const [topic, setTopic] = useState("");

    function submit() {
        console.log(topic);
        console.log(message);
        window.open('mailto:' + targetEmail + '?subject=' + topic + '&body=' + message);
        /* const data = JSON.stringify({
             Messages: [{
                 From: {
                     Email: myEmail,
                     Name: myName,
                 },
                 To: {
                     Email: myEmail,
                     Name: myName,
                 },
                 Subject: topic,
                 TextPart: message
             }
             ]
         })*/
    }

    return (
        <div className={style.main}>
            <Form id={style.form}>
                <Form.Group className="mb-3" controlId="topic">
                    <Form.Label>Topic</Form.Label>
                    <Form.Control type="text" placeholder="Enter brief topic" required onChange={e => setTopic(e.target.value)} />
                    <Form.Text className="text-muted">
                        If you don't know which topic to specify, you can also leave the field blank. Or you can simply enter 'idea' as the topic.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="context">
                    <Form.Label>Your Idea</Form.Label>
                    <Form.Control type="textarea" placeholder="Try out to..." required onChange={e => setMessage(e.target.value)} />
                    <Form.Text className="text-muted">
                        We read through <b>all</b> of your topics. So give us some suggestions for improvement
                    </Form.Text>
                </Form.Group>
                <Button onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}