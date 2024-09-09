const Constants = {
    ApiKey: "ATATT3xFfGF0LO7T---",
    Username: "hunghung274@gmail.com",

}

const JiraRequest = {
    AssignedToMe: "rest/api/2/search?jql=assignee=currentuser()",
    GetTransition: (key) => `rest/api/3/issue/${key}/transitions`, // GET
    Transition: (key) => `rest/api/3/issue/${key}/transitions`, // POST
    AllUsers: `rest/api/3/users`, // GET
    ChangeAssignee: (key) => `rest/api/3/issue/${key}/assignee`, // PUT
    CreateIssue: "rest/api/3/issue", //POST
}

export { Constants, JiraRequest };
