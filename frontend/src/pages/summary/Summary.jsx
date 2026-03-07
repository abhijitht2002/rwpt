import React from 'react'

function Summary() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* HEADER */}
      <section className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900">
          Workspace Overview
        </h1>

        <p className="text-gray-600 mt-3 leading-relaxed">
          This platform is designed to streamline remote collaboration,
          task ownership, and productivity tracking across distributed teams.
          By combining task management, progress monitoring, and personal
          productivity tools into one focused workspace, the application
          helps teams stay aligned while maintaining individual autonomy.
        </p>
      </section>


      {/* PLATFORM SUMMARY */}
      <section className="border border-gray-200 p-6 mb-8">

        <h2 className="text-lg font-medium mb-4">
          Platform Summary
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          The Remote Productivity Workspace is built to support modern
          asynchronous work environments. It allows managers to assign
          structured tasks, employees to track their progress through
          time-based workflows, and administrators to maintain oversight
          across the entire system.
        </p>

        <p className="text-sm text-gray-600 leading-relaxed">
          With clear task ownership, time tracking, activity timelines,
          and productivity utilities, the platform provides transparency
          without interrupting the natural workflow of the team.
        </p>

      </section>


      {/* ROLE SYSTEM */}
      <section className="border border-gray-200 p-6 mb-8">

        <h2 className="text-lg font-medium mb-5">
          Role-Based Workspace
        </h2>

        <div className="space-y-4 text-sm text-gray-600">

          <div>
            <p className="font-medium text-gray-800">Admin</p>
            <p>
              Administrators manage the organizational structure of
              the workspace. They control system-level configuration,
              user access, and maintain the operational integrity
              of the platform.
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Manager</p>
            <p>
              Managers coordinate team productivity by creating tasks,
              assigning employees, and monitoring progress through
              activity logs and completion timelines.
            </p>
          </div>

          <div>
            <p className="font-medium text-gray-800">Employee</p>
            <p>
              Employees interact with assigned tasks through a focused
              workflow that includes start/stop tracking, progress
              updates, and completion summaries. The system encourages
              structured work sessions while maintaining flexibility
              for remote work patterns.
            </p>
          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="border border-gray-200 p-6 mb-8">

        <h2 className="text-lg font-medium mb-5">
          Core Features
        </h2>

        <ul className="text-sm text-gray-600 space-y-3 list-disc pl-5">

          <li>
            Structured task creation and assignment for distributed teams.
          </li>

          <li>
            Live task session tracking with start, stop, and completion
            checkpoints.
          </li>

          <li>
            Activity timeline logs providing a clear history of task
            interactions and progress updates.
          </li>

          <li>
            Deadline monitoring with visual indicators for due soon
            and overdue tasks.
          </li>

          <li>
            Comment-based work summaries that document progress across
            multiple work sessions.
          </li>

        </ul>

      </section>


      {/* PRODUCTIVITY TOOLS */}
      <section className="border border-gray-200 p-6 mb-8">

        <h2 className="text-lg font-medium mb-4">
          Productivity Tools
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          In addition to structured task workflows, the workspace includes
          lightweight productivity tools that support day-to-day focus
          and organization.
        </p>

        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          Sticky Notes provide a quick space to capture ideas, reminders,
          and temporary planning notes while working through assigned tasks.
          These notes are intentionally simple, allowing users to maintain
          personal context without leaving the workspace environment.
        </p>

        <a
          href="/dashboard/notes"
          className="inline-block text-sm border border-black px-4 py-2 hover:bg-black hover:text-white transition"
        >
          Open Sticky Notes
        </a>

      </section>


      {/* PATCH NOTES STYLE SECTION */}
      <section className="border border-gray-200 p-6">

        <h2 className="text-lg font-medium mb-4">
          Development Notes
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          This workspace is currently evolving with additional productivity
          modules and workflow improvements. The goal is to gradually
          expand the platform into a complete remote operations toolkit.
        </p>

        <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">

          <li>Task activity timeline system implemented.</li>

          <li>Session-based work tracking with timer controls.</li>

          <li>Comment-driven work summaries for task completion.</li>

          <li>Sticky notes productivity module added.</li>

          <li>Improved responsive layout for task detail pages.</li>

        </ul>

      </section>

    </div>
  )
}

export default Summary