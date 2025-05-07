export const navItems = [
  { id: 1, name: "Home", icon: "fas", url: "/student/dashboard" },
  { id: 2, name: "Time Table", icon: "fas", url: "/student/timetable" },
  { id: 3, name: "Exams", icon: "fas", url: "/student/exams" },
  { id: 4, name: "Update Password", icon: "fas", url: "/student/update_pass" },
  { id: 5, name: "Logout", icon: "fas", url: "/" },
  { id: 6, name: "Dark Mode", icon: "fas", type: "btn" },
];

export const teacherSidebarItems = {
  closed: {
    icons: [
        {id: 1, name: "fas fa-home", url: '/teacher/dashboard'},
        {id: 2, name: "fas fa-user", url: ''},
        {id: 3, name: "fas fa-car", url: ''},
        {id: 4, name: "fas fa-pen", url: ''},
        {id: 5, name: "fas fa-dog", url: ''},
        {id: 6, name: "fas fa-message", url: ''},
        {id: 7, name: "fas fa-cross", url: ''},
        {id: 8, name: "fas fa-time", url: ''},
    ]
  },
  open: {
    elements: [
        {
          id: 1,  
          title: "",
          children: [{ icon: "fas fa-home", name: "Dashnoard", goto: "/teacher/dashboard" }],
        },
        {
          id: 2,  
          title: "Data",
          children: [
            { icon: "fas fa-user", name: "Students", goto: "" },
            { icon: "fas fa-message", name: "Contact Information", goto: "" },
          ],
        },
        {
          id: 3,  
          title: "Pages",
          children: [
            { icon: "fas fa-user", name: "New Admission", goto: "" },
            { icon: "fas fa-cross", name: "Tmetable", goto: "" },
          ],
        },
        {
          id: 4,  
          title: "Charts",
          children: [
            { icon: "fas fa-square", name: "Class Progress", goto: "" },
            { icon: "fas fa-circle", name: "Class Marks", goto: "" },
            { icon: "fas fa-plus", name: "All Classes", goto: "" },
          ],
        },
      ],
  }
};
