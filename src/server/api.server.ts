import { createServerFn } from '@tanstack/react-start'
import { prisma } from '../lib/db'

export const getState = createServerFn({ method: 'GET' })
  .handler(async () => {
    const tcms = await prisma.tCM.findMany()
    const properties = await prisma.property.findMany()
    const leads = await prisma.lead.findMany()
    const tours = await prisma.tour.findMany()
    const activities = await prisma.activityLog.findMany({ orderBy: { ts: 'desc' } })
    const followUps = await prisma.followUp.findMany({ orderBy: { dueAt: 'asc' } })
    const handoffs = await prisma.handoffMessage.findMany({ orderBy: { ts: 'asc' } })
    const sequences = await prisma.activeSequence.findMany()
    const bookings = await prisma.booking.findMany({ orderBy: { ts: 'desc' } })
    
    return {
      tcms,
      properties,
      leads,
      tours,
      activities,
      followUps,
      handoffs,
      sequences,
      bookings
    }
  })

export const updateLeadStage = createServerFn({ method: 'POST' })
  .validator((d: { leadId: string, stage: string }) => d)
  .handler(async (ctx) => {
    const { leadId, stage } = ctx.data
    return await prisma.lead.update({
      where: { id: leadId },
      data: { stage }
    })
  })

