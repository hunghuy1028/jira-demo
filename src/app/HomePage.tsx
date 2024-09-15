
import axios from "axios";
import { Constants, JiraRequest } from "./Constants";
import { useEffect, useState } from "react";
import { LS } from "./Helper";
import { AuthData } from "./auth/AuthData";
import Transition from "./Transition";

export default function HomePage() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        document.addEventListener("visibilitychange", (e) => {
            if (isAuthenticating && document.visibilityState === "visible") {
                setIsAuthenticating(false);
                // TODO reload JIRA issue here;
            }
        })
    }, []);

    async function login() {
        window.open("https://auth.atlassian.com/authorize?" +
            "audience=api.atlassian.com" +
            `&client_id=${Constants.ClientId}` +
            "&scope=read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20write%3Ajira-work%20read%3Ajira-user%20manage%3Ajira-webhook%20manage%3Ajira-data-provider" +
            "&redirect_uri=http:%2F%2Flocalhost:3200%2Fauth" +
            `&state=${Constants.StateCode}` +
            "&response_type=code" +
            "&prompt=consent", "_blank");
        setIsAuthenticating(true);
    }

    const jiraApiV1 = async (method: string, request: string, body: any) => {
        try {
            const req = await axios({
                url: `https://hunghung274.atlassian.net/${request}`,
                method: method,
                params: {
                    startAt: 0,
                    maxResults: 50,
                },
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + btoa(Constants.ApiKey + Constants.Username)
                }
            });
            console.log(req);
            return req;
        } catch (e) {
            console.log(e);
        }

        return null;
    }

    async function jiraApiV2(method: string, request: string, body: any) {
        const authData = LS.get<AuthData>("login");

        if (authData) {
            try {
                const req = await axios({
                    url: `https://api.atlassian.com/ex/jira/${authData.cloudId}/${request}`,
                    method: method,
                    params: {
                        startAt: 0,
                        maxResults: 50,
                    },
                    data: body,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${authData.accessToken}`
                    }
                });
                return req?.data;
            } catch (e) {
                console.log(e);
            }

            return null;
        }
    }

    const render = () => {

        const onJiraClick = (key) => {
            setSelectJira(key);
            setSelectTransition(null);
            setTransitionList([]);
        }

        if (!jira) return;

        return (
            jira.issues.map((x, id) => <div>
                <p onClick={() => onJiraClick(x.key)} key={id}>No {id + 1} | Key: {x.key} | 
                    Summary: {x.fields.summary} | 
                    Status: {x.fields.status.name} | 
                    Assignee: {x.fields.assignee.emailAddress}</p>
                <hr/>
            </div>)
        )

    }

    const getResource = async () => {
        const data = await jiraApiV2("GET", JiraRequest.AssignedToMe, {});
        setJira(data);

    }

    const getTransition = async () => {

        if(!selectJira) {
            return;
        }

        const data = await jiraApiV2("GET", JiraRequest.GetTransition(selectJira), {});
        setTransitionList(data.transitions as Transition[]);
    }

    const transition = async () => {
        if(selectJira && selectTransition){
            await jiraApiV2("POST", JiraRequest.Transition(selectJira), {
                "transition": {
                    "id": selectTransition.id
                }
            });

            getResource();
        }
    }

    const changeAssignee = async () => {
        const data = await jiraApiV2("PUT", JiraRequest.ChangeAssignee(selectJira), {
            "accountId": "712020:8d4e34ad-703c-4600-a854-525f40dc386e"
        });
    }

    const createIssue = async () => {
        const data = await jiraApiV2("POST", JiraRequest.CreateIssue, {
            "fields": {
                "project": {
                    "id": 10000
                },
                "issuetype": {
                    "id": "10003"
                },
                "summary": newJiraSummary
            }
        });

        getResource();
    }

    const [jira, setJira] = useState(undefined);
    const [selectJira, setSelectJira] = useState("");
    const [selectTransition, setSelectTransition] = useState<Transition>(null);
    const [transitionList, setTransitionList] = useState<Transition[]>([]);
    const [newJiraSummary, setNewJiraSummary] = useState('');


    return (
        <div>
            <button onClick={() => login()}>Log in Jira</button>

            <br />

            <br />

            <button onClick={() => getResource()}>Get All Issues assigned to me</button>

            <br />

            <br />

            <p>Current Select: {selectJira}</p>
            <div>
                {render()}
            </div>

            <div style={{marginTop: 20}}>

                <button onClick={() => getTransition()}>Get Transition</button>

                {selectTransition && <p>Selected transition: {selectTransition.name}</p>}

                <ol>
                    {
                        transitionList.map((x,i) => <li onClick={() => setSelectTransition(x)} key={i}>{i+1}.{x.name}</li>)
                    }
                </ol>
            </div>

            <br />
            <button onClick={() => transition()}>Transition</button>

            <div style={{marginTop: 50}}>
                <textarea value={newJiraSummary} onChange={(e) => setNewJiraSummary(e.target.value)}></textarea>
                <button onClick={() => createIssue()}>Create Jira</button>
            </div >
        </div>
    );
}