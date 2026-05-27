import type { GatsbyNode } from "gatsby"

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    extend interface Project {
      photos: [String]
    }
    extend type MdxProject {
      photos: [String]
    }
  `)
}

export const createResolvers: GatsbyNode["createResolvers"] = ({ createResolvers: cr }) => {
  cr({
    MdxProject: {
      photos: {
        resolve: (source: any, _args: any, context: any) => {
          const mdxNode = context.nodeModel.getNodeById({ id: source.parent }) as any
          return mdxNode?.frontmatter?.photos ?? null
        },
      },
    },
  })
}
