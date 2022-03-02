# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# clean up database when seeding -- 
#   avoids errors of trying to create users if the db has already been seeded
User.destroy_all
User.create([
  {
    email: "George",
    password: "gerogios",
    about_me: "I love to play guitar on sunny days at the beach."
  },
  {
    email: "Belinda",
    password: "Ilikebells",
    about_me: "Teaching is cool, especially when your students go on to teach others creating a cascading wave of information!"
  },
  {
    email: "Fred",
    password: "notagoodpassword",
    about_me: "Being on a team you can trust makes it easier to focus on the task at hand."
  },
  {
    email: "Olivia",
    password: "Oliveoilevoo",
    about_me: "Knowing who is responsible for what makes following up on a project quick and efficient!"
  },
  {
    email: "Joe",
    password: "Possums-Are-Awesome",
    about_me: "On off days I like to go to the zoo and remember that we are all social animals at our core."
  },
  {
    email: "Samantha",
    password: "1231231432",
    about_me: "Anasa has saved me so much time that I would've otherwise spent writing emails or on call managing projects"
  },
])

Team.destroy_all
Team.create([
  {
    name: "DeeperMind",
    description: "DeeperMind's goal is to create AI that can neutralize any potential AI threat to mankind"
  },

  {
    name: "GreenMars",
    description: "We seek to re-establish Mars's atmosphere to make it green and hospitable to human life."
  },

  {
    name: "TBA",
    description: ""
  },
])

UserTeam.destroy_all

# for testing -- make first user connected to all teams

User.all.each do |user|
  UserTeam.create({user_id: user.id, team_id: Team.all.sample.id})
end


Project.destroy_all

User.all.includes(:teams).each do |user|
  Project.create(
    {
      owner_id: user.id,
      name: "#{user.email}'s project",
      team_id: user.teams.first.id
    });
end

Task.destroy_all

tasks = [
  "Make Presentation",
  "Attend Meeting",
  "Write Report",
  "Follow Up With Client",
  "Analyze Data"
]

User.all.each do |user|
  user.projects.each do |project|
    Task.create(
      {
        assignee_id: user.id,
        name: tasks.sample,
        taskable_type: "Project",
        taskable_id: project.id
      }
    )
  end

  Task.create(
    {
      assignee_id: user.id,
      name: tasks.sample,
      taskable_type: "User",
      taskable_id: user.id
    }
  )
end