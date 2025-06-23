import CampusLife from "../assets/campusLife.webp";
import ScienceLab from "../assets/ScienceLab.webp";
import Library from "../assets/Library.webp";
import SportsDay from "../assets/SportsDay.webp";
import ArtClass from "../assets/ArtClasss.webp";
import Graduation from "../assets/Graduation.webp";

export const galleryImages = [
  { src: CampusLife, alt: 'Campus Life' },
  { src: ScienceLab, alt: 'Science Lab' },
  { src: Library, alt: 'Library' },
  { src: SportsDay, alt: 'Sports Day' },
  { src: ArtClass, alt: 'Art Class' },
  { src: Graduation, alt: 'Graduation' },
];

export const notices = [
  { id: 1, title: 'Annual Sports Meet 2024', date: '2024-08-15', content: 'The annual sports meet will be held on the school grounds. All students are encouraged to participate in various track and field events. It will be a day of fun and healthy competition.' },
  { id: 2, title: 'Parent-Teacher Meeting', date: '2024-08-10', content: 'A parent-teacher meeting is scheduled to discuss the half-yearly progress of students from classes 1 to 12. Your presence is highly solicited.' },
  { id: 3, title: 'Science Exhibition Announcement', date: '2024-08-05', content: 'Submissions for the annual science exhibition are now open. The theme for this year is "Innovation for a Sustainable Future". Last date for project submission is 20th August.' },
  { id: 4, title: 'Holiday Declaration', date: '2024-08-01', content: 'The school will remain closed on account of Independence Day celebrations. We encourage all students to celebrate this historic day with patriotism and pride.' },
];

export const events = [
  {
    id: 1,
    title: "Parent-Teacher Conference",
    date: "August 5, 2025",
    description: "Discuss your child's progress with their teachers.",
  },
  {
    id: 2,
    title: "Workshop: Coding for Beginners",
    date: "August 12, 2025",
    description: "An introductory workshop on programming fundamentals.",
  },
  {
    id: 3,
    title: "Annual Day Celebrations",
    date: "August 25, 2025",
    description: "Join us for a day of performances and celebration.",
  },
];

export const studentData = {
  name: 'Alex Doe',
  studentId: 'S12345',
  class: '10th Grade - Section A',
  profilePic: 'https://placehold.co/150x150/0f172a/f59e0b?text=A',
  attendance: '92%',
  grades: [
    { subject: 'Mathematics', grade: 'A+' },
    { subject: 'Science', grade: 'A' },
    { subject: 'English', grade: 'A+' },
    { subject: 'History', grade: 'B+' },
    { subject: 'Art', grade: 'A' },
  ],
  assignments: [
      { id: 1, subject: 'Mathematics', title: 'Algebra II Worksheet', dueDate: '2024-09-01', submitted: true },
      { id: 2, subject: 'Science', title: 'Photosynthesis Lab Report', dueDate: '2024-09-05', submitted: false },
      { id: 3, subject: 'English', title: 'Essay on "The Great Gatsby"', dueDate: '2024-09-10', submitted: false },
  ]
};