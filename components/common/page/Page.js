/* External dependencies */
import React from 'react'

class Page extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        {children}
      </div>
    )
  }
}

export default Page
