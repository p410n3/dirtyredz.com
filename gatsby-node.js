const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
// const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope'); // eslint-disable-line

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const ProjectComponent = path.resolve('./src/templates/Projects.js') // eslint-disable-line
    resolve(
      graphql( // , frontmatter: { title: {ne: "Example"}}
        `
         {
          Blogs: allMarkdownRemark(limit: 500,filter: {fileAbsolutePath: { regex: "/blog/"}, frontmatter: { title: {ne: "Example"}}},sort: { fields: [frontmatter___created], order: DESC }) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  title
                  path
                }
              }
            }
          }
          Projects: allMarkdownRemark(limit: 500,filter: {frontmatter: { path: { regex: "/project/"}}},sort: { fields: [frontmatter___created], order: DESC }) {
            edges {
              node {
                fields {
                  slug
                }
                id
                tableOfContents
                frontmatter {
                  title
                  path
                  skills
                  keywords
                  created(formatString: "DD MMMM, YYYY")
                  updated(formatString: "DD MMMM, YYYY")
                }
              }
            }
          }
        }
        `
      ).then((result) => {
        if (result.errors) {
          // Error(result.errors)
          reject(result.errors)
        }
        if (result.data.Blogs) {
          // Create blog posts pages.
          const posts = result.data.Blogs.edges;

          posts.forEach((post) => {
            createPage({
              path: post.node.frontmatter.path,
              name: post.node.frontmatter.title,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
                title: post.node.frontmatter.title,
              },
            })
          })
        }

        // Create projects pages.
        const projects = result.data.Projects.edges;
        projects.forEach((project) => {
          // const previous = index === projects.length - 1 ? null : projects[index + 1].node;
          // const next = index === 0 ? null : projects[index - 1].node;
          const { path, ...rest } = project.node.frontmatter
          createPage({
            path,
            name: project.node.frontmatter.title,
            component: ProjectComponent,
            context: {
              slug: project.node.fields.slug,
              ...rest,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  return new Promise((resolve) => {
    // const oldPage = Object.assign({}, page)
    const Title = page.path.replace('/', '');
    const newPage = {
      ...page,
      context: Object.assign({ title: Title !== '' ? Title : 'Home' }, page.context),
    }
    // deletePage(oldPage)
    createPage(newPage)
    resolve()
  })
}
