"use client"

import React, { useState } from 'react'
import { 
  Plus, Edit3, Trash2, Copy, Eye, EyeOff, GripVertical, 
  Settings, ChevronDown, ChevronUp, AlertCircle 
} from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useWebsiteStore } from '@/lib/store/website-store'
import { WidgetSelector } from './widget-selector'
import { DynamicWidgetConfigModal } from './dynamic-widget-config-modal'
import { SectionData } from '@/lib/widgets/core/types'

// Sortable Item Component
function SortableSectionItem({ section, isSelected, isExpanded, onToggleExpanded, onSelect, onEdit, onDuplicate, onDelete, onToggleActive, validation }: {
  section: SectionData
  isSelected: boolean
  isExpanded: boolean
  onToggleExpanded: () => void
  onSelect: () => void
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
  onToggleActive: () => void
  validation: { isValid: boolean; errors: string[] }
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 border rounded-lg transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 ring-2 ring-blue-500/20' 
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
      } ${
        isDragging ? 'shadow-lg opacity-50' : 'shadow-sm'
      }`}
    >
      {/* Section Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            {/* Drag Handle */}
            <div 
              {...attributes}
              {...listeners}
              className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-5 h-5" />
            </div>

            {/* Section Info */}
            <div 
              className="flex-1 cursor-pointer"
              onClick={onSelect}
            >
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                
                {/* Widget Type Badge */}
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs rounded">
                  {section.widgetType}
                </span>

                {/* Status Indicators */}
                {!section.isActive && (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                )}
                
                {!validation.isValid && (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Order: {section.order} • {section.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>

            {/* Expand/Collapse */}
            <button
              onClick={onToggleExpanded}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={onToggleActive}
              className={`p-2 rounded-lg transition-colors ${
                section.isActive
                  ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={section.isActive ? 'Hide Section' : 'Show Section'}
            >
              {section.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>

            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg"
              title="Edit Widget"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={onDuplicate}
              className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg"
              title="Duplicate Section"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg"
              title="Delete Section"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50">
          <div className="space-y-3">
            {/* Widget Data Preview */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Widget Configuration
              </h4>
              <div className="bg-white dark:bg-gray-800 rounded border p-3">
                <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto">
                  {JSON.stringify(section.data, null, 2).substring(0, 200)}
                  {JSON.stringify(section.data, null, 2).length > 200 && '...'}
                </pre>
              </div>
            </div>

            {/* Validation Errors */}
            {!validation.isValid && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                <h5 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Validation Errors:
                </h5>
                <ul className="text-sm text-red-700 dark:text-red-300 list-disc list-inside">
                  {validation.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metadata */}
            <div className="text-xs text-gray-500 dark:text-gray-400 grid grid-cols-2 gap-2">
              <div>Created: {section.metadata?.createdAt ? new Date(section.metadata.createdAt).toLocaleDateString() : 'Unknown'}</div>
              <div>Updated: {section.metadata?.updatedAt ? new Date(section.metadata.updatedAt).toLocaleDateString() : 'Unknown'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * SectionManager - หลักของ Website CMS สำหรับจัดการ sections
 * ใช้ OOP Widget system + Drag & Drop + Real-time config
 */
export const SectionManager: React.FC = () => {
  // ดึง functions จาก Zustand store สำหรับ CRUD operations
  const { 
    sections,              // รายการ sections ทั้งหมดในหน้า
    selectedSection,       // section ที่กำลังเลือกอยู่
    selectSection,         // function เลือก section
    addSection,           // function เพิ่ม section ใหม่
    deleteSection,        // function ลบ section
    duplicateSection,     // function ทำสำเนา section
    toggleSectionActive,  // function เปิด/ปิด section
    reorderSections,      // function เปลี่ยนลำดับ sections
    validateSectionData   // function ตรวจสอบความถูกต้องของ section data
  } = useWebsiteStore()

  // State สำหรับควบคุม UI
  const [showWidgetSelector, setShowWidgetSelector] = useState(false) // เปิด/ปิด modal เลือก widget
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean      // เปิด/ปิด config modal
    sectionId?: string   // ID ของ section ที่จะ config (undefined = สร้างใหม่)
    widgetType?: string  // ประเภทของ widget ที่จะ config
    isNewWidget?: boolean // flag บอกว่าเป็น widget ใหม่หรือแก้ไขของเก่า
  }>({ isOpen: false })
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set()) // เก็บ ID ของ sections ที่ขยายดูรายละเอียด

  // ตั้งค่า sensors สำหรับ drag & drop (รองรับทั้งเมาส์และคีย์บอร์ด)
  const sensors = useSensors(
    useSensor(PointerSensor),        // ลากด้วยเมาส์
    useSensor(KeyboardSensor, {      // ลากด้วยคีย์บอร์ด (accessibility)
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  /**
   * จัดการเมื่อผู้ใช้เลือก widget ใหม่
   * - ปิด widget selector
   * - เปิด config modal ทันทีเพื่อให้ config ก่อนสร้าง section
   */
  const handleAddWidget = (widgetType: string) => {
    setShowWidgetSelector(false)
    
    // เปิด config modal ก่อนสร้าง section (UX ดีกว่า)
    setConfigModal({
      isOpen: true,
      sectionId: undefined,    // ยังไม่มี section ให้ใส่ undefined
      widgetType,             // ประเภท widget ที่เลือก
      isNewWidget: true       // flag บอกว่าเป็น widget ใหม่
    })
  }

  /**
   * จัดการเมื่อ drag & drop เสร็จสิ้น
   * - คำนวณตำแหน่งเก่าและใหม่
   * - เรียง sections ใหม่
   * - บันทึกลำดับใหม่ผ่าน store
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // ตรวจสอบว่ามีการเปลี่ยนตำแหน่งจริงๆ
    if (over && active.id !== over.id) {
      // หา index เก่าและใหม่
      const oldIndex = sections.findIndex(section => section.id === active.id)
      const newIndex = sections.findIndex(section => section.id === over.id)
      
      // เรียงลำดับใหม่และบันทึก
      const newOrder = arrayMove(sections, oldIndex, newIndex)
      const sectionIds = newOrder.map(s => s.id)
      reorderSections(sectionIds) // จะ auto-save หลังจาก 100ms
    }
  }

  /**
   * เปิด/ปิดการแสดงรายละเอียดของ section
   * - ใช้ Set เพื่อเก็บ ID ของ sections ที่ขยาย
   * - Toggle: มีอยู่แล้วก็ลบ, ไม่มีก็เพิ่ม
   */
  const toggleExpanded = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)    // ปิดการขยาย
    } else {
      newExpanded.add(sectionId)       // เปิดการขยาย
    }
    setExpandedSections(newExpanded)
  }

  /**
   * ตรวจสอบสถานะของ section
   * - เรียก validateSectionData จาก store
   * - return { isValid: boolean, errors: string[] }
   */
  const getSectionStatus = (sectionId: string) => {
    const validation = validateSectionData(sectionId)
    return validation
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Section Manager
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            จัดการ sections ของหน้าเว็บ • ลากเพื่อจัดเรียงลำดับ • คลิกเพื่อเลือก section
          </p>
        </div>
        
        <button
          onClick={() => setShowWidgetSelector(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Widget
        </button>
      </div>

      {/* Section List */}
      {sections.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No sections yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            เริ่มต้นสร้างหน้าเว็บของคุณด้วยการเพิ่ม widget แรก
          </p>
          <button
            onClick={() => setShowWidgetSelector(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add First Widget
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Section Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Total: {sections.length} sections</span>
            <span>Active: {sections.filter(s => s.isActive).length}</span>
            <span>Hidden: {sections.filter(s => !s.isActive).length}</span>
          </div>

          {/* Draggable Section List */}
          {/* รายการ sections ที่สามารถลากจับเปลี่ยนลำดับได้ ใช้ @dnd-kit สำหรับ drag & drop แต่ละ section จะแสดงเป็น card พร้อม config, duplicate, delete */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {sections.map((section) => {
                  const isSelected = selectedSection === section.id
                  const isExpanded = expandedSections.has(section.id)
                  const validation = getSectionStatus(section.id)

                  return (
                    <SortableSectionItem
                      key={section.id}
                      section={section}
                      isSelected={isSelected}
                      isExpanded={isExpanded}
                      onToggleExpanded={() => toggleExpanded(section.id)}
                      onSelect={() => selectSection(isSelected ? null : section.id)}
                      onEdit={() => setConfigModal({ isOpen: true, sectionId: section.id })}
                      onDuplicate={() => duplicateSection(section.id)}
                      onDelete={() => deleteSection(section.id)}
                      onToggleActive={() => toggleSectionActive(section.id)}
                      validation={validation}
                    />
                  )
                })}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Widget Selector Modal */}
      {showWidgetSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="max-w-4xl w-full mx-4">
            <WidgetSelector
              onSelectWidget={handleAddWidget}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowWidgetSelector(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Widget Config Modal */}
      <DynamicWidgetConfigModal
        isOpen={configModal.isOpen}
        sectionId={configModal.sectionId}
        widgetType={configModal.widgetType}
        isNewWidget={configModal.isNewWidget}
        onClose={() => setConfigModal({ isOpen: false })}
      />
    </div>
  )
}