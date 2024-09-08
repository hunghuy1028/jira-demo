const Constants = {
    ApiKey: "ATATT3xFfGF0LO7TxKqqanreqwvQC2qUP6LfjVNL3SIayKXMCsIRq1jh9tDXUhx2ORpHnTbo4ydVoiD67WhqRYStlADMj59DXK3XuV4hMNuqS4HP3oCciCJbDYacWiffXpEMyVhbDcdU89JJzFGYcQGqIufezZ5nT2VAVM9D7RLkwyF4JySOIJY=12D6A0ED",
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