import { PrismaClient } from '@prisma/client'
import { TCMS, PROPERTIES, LEADS, TOURS, ACTIVITIES, FOLLOWUPS, HANDOFFS, SEQUENCES_INIT } from '../src/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Database...')

  // Clean up
  await prisma.activityLog.deleteMany()
  await prisma.handoffMessage.deleteMany()
  await prisma.activeSequence.deleteMany()
  await prisma.followUp.deleteMany()
  await prisma.tour.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.property.deleteMany()
  await prisma.tCM.deleteMany()

  // Seed TCMs
  for (const tcm of TCMS) {
    await prisma.tCM.create({
      data: {
        id: tcm.id,
        name: tcm.name,
        initials: tcm.initials,
        zone: tcm.zone,
        conversionRate: tcm.conversionRate,
        avgResponseMins: tcm.avgResponseMins,
      }
    })
  }

  // Seed Properties
  for (const prop of PROPERTIES) {
    await prisma.property.create({
      data: {
        id: prop.id,
        name: prop.name,
        area: prop.area,
        totalBeds: prop.totalBeds,
        vacantBeds: prop.vacantBeds,
        daysSinceLastBooking: prop.daysSinceLastBooking,
        pricePerBed: prop.pricePerBed,
      }
    })
  }

  // Seed Leads
  for (const lead of LEADS) {
    await prisma.lead.create({
      data: {
        id: lead.id,
        name: lead.name,
        phone: lead.phone,
        source: lead.source,
        budget: lead.budget,
        moveInDate: new Date(lead.moveInDate),
        preferredArea: lead.preferredArea,
        assignedTcmId: lead.assignedTcmId,
        stage: lead.stage,
        intent: lead.intent,
        confidence: lead.confidence,
        tags: JSON.stringify(lead.tags),
        nextFollowUpAt: lead.nextFollowUpAt ? new Date(lead.nextFollowUpAt) : null,
        responseSpeedMins: lead.responseSpeedMins,
        createdAt: new Date(lead.createdAt),
        updatedAt: new Date(lead.updatedAt),
      }
    })
  }

  // Seed Tours
  for (const tour of TOURS) {
    await prisma.tour.create({
      data: {
        id: tour.id,
        leadId: tour.leadId,
        propertyId: tour.propertyId,
        tcmId: tour.tcmId,
        scheduledAt: new Date(tour.scheduledAt),
        status: tour.status,
        decision: tour.decision,
        ptOutcome: tour.postTour.outcome,
        ptConfidence: tour.postTour.confidence,
        ptObjection: tour.postTour.objection,
        ptObjectionNote: tour.postTour.objectionNote,
        ptExpectedDecisionAt: tour.postTour.expectedDecisionAt ? new Date(tour.postTour.expectedDecisionAt) : null,
        ptNextFollowUpAt: tour.postTour.nextFollowUpAt ? new Date(tour.postTour.nextFollowUpAt) : null,
        ptFilledAt: tour.postTour.filledAt ? new Date(tour.postTour.filledAt) : null,
        createdAt: new Date(tour.createdAt),
        updatedAt: new Date(tour.updatedAt),
      }
    })
  }

  // Seed FollowUps
  for (const f of FOLLOWUPS) {
    await prisma.followUp.create({
      data: {
        id: f.id,
        leadId: f.leadId,
        tourId: f.tourId || null,
        tcmId: f.tcmId,
        dueAt: new Date(f.dueAt),
        priority: f.priority,
        reason: f.reason,
        done: f.done,
      }
    })
  }

  // Seed ActivityLogs
  for (const a of ACTIVITIES) {
    await prisma.activityLog.create({
      data: {
        id: a.id,
        ts: new Date(a.ts),
        kind: a.kind,
        actor: a.actor,
        text: a.text,
        leadId: a.leadId,
        tourId: a.tourId,
        propertyId: a.propertyId,
      }
    })
  }

  // Seed HandoffMessages
  for (const h of HANDOFFS) {
    await prisma.handoffMessage.create({
      data: {
        id: h.id,
        ts: new Date(h.ts),
        leadId: h.leadId,
        fromRole: h.from,
        fromId: h.fromId,
        toRole: h.to,
        text: h.text,
        priority: h.priority,
        read: h.read,
      }
    })
  }

  // Seed Sequences
  for (const s of SEQUENCES_INIT) {
    await prisma.activeSequence.create({
      data: {
        id: s.id,
        leadId: s.leadId,
        kind: s.kind,
        startedAt: new Date(s.startedAt),
        currentStep: s.currentStep,
        paused: s.paused,
        stoppedReason: s.stoppedReason,
      }
    })
  }

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
