import { fakerLV as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async (numEntries = 3) => {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name,
      slug: faker.lorem.slug(3),
      status: faker.helpers.arrayElement(['in-progress', 'compleated']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  // const { data, error, status } = await supabase.from('projects').insert({
  //   name: name,
  //   slug: faker.lorem.slug(3),
  //   status: faker.helpers.arrayElement(['in-progress', 'compleated']),
  //   collaborators: faker.helpers.arrayElements([1, 2, 3]),
  // })

  // const { data, error, status } = await supabase.from('projects').insert(projects)

  // console.log(data, error, status)

  await supabase.from('projects').insert(projects)
}

await seedProjects()
