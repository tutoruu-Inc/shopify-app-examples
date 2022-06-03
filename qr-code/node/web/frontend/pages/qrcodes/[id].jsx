import { useParams } from 'react-router-dom'
import { Card, Page, Layout, SkeletonBodyText } from '@shopify/polaris'
import { Loading, TitleBar } from '@shopify/app-bridge-react'

import { useAppQuery } from '../../hooks'
import { QRCodeForm } from '../../components'

export default function QRCodeEdit() {
  const { id } = useParams()
  const {
    data: QRCode,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: `/api/qrcodes/${id}`,
    reactQueryOptions: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  })

  const titleBarMarkup = <TitleBar title="Edit QR code" primaryAction={null} />

  if (isLoading || isRefetching) {
    return (
      <Page>
        {titleBarMarkup}
        <Loading />
        <Layout>
          <Layout.Section>
            <Card sectioned title="Title">
              <SkeletonBodyText />
            </Card>
            <Card title="Product">
              <Card.Section>
                <SkeletonBodyText lines={1} />
              </Card.Section>
              <Card.Section>
                <SkeletonBodyText lines={3} />
              </Card.Section>
            </Card>
            <Card sectioned title="Discount">
              <SkeletonBodyText lines={2} />
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card sectioned title="QR Code" />
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  return (
    <Page>
      {titleBarMarkup}
      <QRCodeForm QRCode={QRCode} />
    </Page>
  )
}