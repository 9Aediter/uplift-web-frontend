import React from 'react'
import { BaseGridWidget } from '../base/BaseGridWidget'
import { WidgetConfig, WidgetData, RenderContext } from '../../core/types'

/**
 * Solution Grid Widget - Display business solutions in bento grid format
 * Perfect for showcasing products, services, and solutions
 */
export class SolutionGridWidget extends BaseGridWidget {
  readonly id = 'solution-grid'
  readonly name = 'Solution Grid'
  readonly description = 'Display business solutions and products in a responsive bento grid layout'
  readonly version = '1.0.0'
  protected tags = ['solutions', 'products', 'grid', 'bento', 'showcase']

  /**
   * Render the SolutionGrid component (CLIENT-SIDE for admin preview)
   */
  render(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { SolutionGridComponent } = require('./SolutionGrid.component')
      
      if (!SolutionGridComponent) {
        console.error('🚫 [SOLUTION GRID] SolutionGridComponent is undefined after require')
        return this.renderSkeleton()
      }
      
      return function SolutionGridRenderer() {
        return React.createElement(SolutionGridComponent, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [SOLUTION GRID] Failed to require SolutionGrid component:', error)
      return this.renderSkeleton()
    }
  }

  /**
   * Render the skeleton loading state (Client-side + Admin preview)
   */
  renderSkeleton(): React.ComponentType {
    try {
      const { SolutionGridSkeleton } = require('./SolutionGrid.skeleton')
      return SolutionGridSkeleton
    } catch (error) {
      console.error('🚫 [SOLUTION GRID] Failed to render skeleton:', error)
      // Fallback basic skeleton
      return () => React.createElement('div', {
        className: 'py-20 bg-gradient-to-b from-background to-muted/30 animate-pulse'
      }, React.createElement('div', {
        className: 'max-w-7xl mx-auto px-4'
      }, React.createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6'
      }, Array(6).fill(0).map((_, i) => 
        React.createElement('div', {
          key: i,
          className: 'bg-gray-200 dark:bg-gray-800 rounded-lg'
        })
      ))))
    }
  }

  /**
   * MANDATORY: Render SolutionGrid for SSR (PRODUCTION - uses SSR component)
   */
  renderSSR(data: WidgetData, context?: RenderContext): React.ComponentType<any> {
    try {
      const { SolutionGridSSR } = require('./SolutionGrid.ssr')
      
      return function SolutionGridSSRRenderer() {
        return React.createElement(SolutionGridSSR, {
          ...data,
          context
        })
      }
    } catch (error) {
      console.error('🚫 [SOLUTION GRID] Failed to load SSR component:', error)
      return this.renderSkeletonSSR()
    }
  }

  /**
   * MANDATORY: Render skeleton for SSR (PRODUCTION - SSR safe)
   */
  renderSkeletonSSR(): React.ComponentType {
    return () => React.createElement('div', {
      className: 'py-20 bg-gradient-to-b from-background to-muted/30'
    }, React.createElement('div', {
      className: 'max-w-7xl mx-auto px-4'
    }, React.createElement('div', {
      className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-6'
    }, Array(6).fill(0).map((_, i) => 
      React.createElement('div', {
        key: i,
        className: 'bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse'
      })
    ))))
  }

  /**
   * Get widget configuration for admin interface
   */
  getConfig(): WidgetConfig {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      description: this.description,
      fields: [
        ...this.getCommonGridFields(),
        {
          key: 'items',
          label: 'Solution Items',
          type: 'array',
          maxItems: 12,
          fields: [
            {
              key: 'title',
              label: 'Solution Title',
              type: 'text',
              required: true,
              placeholder: 'Laundry Operation System'
            },
            {
              key: 'description',
              label: 'Solution Description',
              type: 'textarea',
              required: true,
              placeholder: 'Brief description of the solution'
            },
            {
              key: 'icon',
              label: 'Solution Icon',
              type: 'text',
              required: true,
              placeholder: '🚀 (emoji or icon component)',
              defaultValue: '🚀'
            },
            {
              key: 'image',
              label: 'Solution Image URL',
              type: 'text',
              required: true,
              placeholder: 'https://example.com/image.jpg'
            },
            {
              key: 'bgColor',
              label: 'Background Color',
              type: 'select',
              options: [
                { value: 'bg-sky-100 dark:bg-sky-900/20', label: 'Sky Blue' },
                { value: 'bg-green-100 dark:bg-green-900/20', label: 'Green' },
                { value: 'bg-yellow-100 dark:bg-yellow-900/20', label: 'Yellow' },
                { value: 'bg-orange-100 dark:bg-orange-900/20', label: 'Orange' },
                { value: 'bg-purple-100 dark:bg-purple-900/20', label: 'Purple' },
                { value: 'bg-gray-100 dark:bg-gray-900/20', label: 'Gray' }
              ],
              defaultValue: 'bg-sky-100 dark:bg-sky-900/20'
            },
            {
              key: 'className',
              label: 'Grid Span Class',
              type: 'select',
              options: [
                { value: 'md:col-span-1', label: 'Single Column' },
                { value: 'md:col-span-2', label: 'Two Columns' },
                { value: 'md:col-span-3', label: 'Three Columns' },
                { value: 'md:col-span-4', label: 'Full Width' }
              ],
              defaultValue: 'md:col-span-1'
            },
            {
              key: 'clickAction',
              label: 'Click Action',
              type: 'select',
              options: [
                { value: 'modal', label: 'Open Modal' },
                { value: 'link', label: 'Navigate to Link' },
                { value: 'none', label: 'No Action' }
              ],
              defaultValue: 'modal'
            }
          ]
        }
      ],
      defaultData: this.getDefaultData()
    }
  }

  /**
   * Get default data for new widget instances
   */
  getDefaultData(): WidgetData {
    return {
      title: 'Solutions & Expertise',
      subtitle: 'ออกแบบและพัฒนาระบบสารสนเทศขนาดใหญ่สำหรับธุรกิจในหลากหลายอุตสาหกรรม',
      backgroundColor: 'bg-gradient-to-b from-background to-muted/30',
      gridLayout: 'bento',
      columns: 4,
      gap: 6,
      items: [
        {
          id: 1,
          title: 'Laundry Operation System',
          description: 'ระบบติดตามการซักรีดครบวงจร รองรับเครือข่ายระดับประเทศ',
          icon: '🧺',
          image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755080060582-s7qvzu2t2rh-view-laundromat-room-with-washing-machines.jpg',
          bgColor: 'bg-sky-100 dark:bg-sky-900/20',
          className: 'md:col-span-1',
          clickAction: 'modal'
        },
        {
          id: 2,
          title: 'Laundry Tracking Core',
          description: 'เรียลไทม์ติดตาม ลดเวลาสูญเปล่า เพิ่มความแม่นยำ',
          icon: '📱',
          image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081413583-r9a2lsfqpts-cashier-seller-operating-payment-process-with-pos-terminal-credit-card-cropped-shot-closeup-hands-shopping-purchase-concept.jpg',
          bgColor: 'bg-sky-100 dark:bg-sky-900/20',
          className: 'md:col-span-1',
          clickAction: 'modal'
        },
        {
          id: 3,
          title: 'Smart Gym Management',
          description: 'ระบบบริหารฟิตเนส สมาชิก อุปกรณ์ คลาส แบบครบวงจร',
          icon: '💪',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop&auto=format',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          className: 'md:col-span-1',
          clickAction: 'modal'
        },
        {
          id: 4,
          title: 'Warehouse Management',
          description: 'ระบบคลังสินค้าอัตโนมัติ เชื่อมต่อ Automation ลดต้นทุนแรงงาน',
          icon: '🏭',
          image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081511881-7r0uq54z3v5-interior-large-distribution-warehouse-with-shelves-stacked-with-palettes-goods-ready-market.jpg',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          className: 'md:col-span-2',
          clickAction: 'modal'
        },
        {
          id: 5,
          title: 'Retail POS System',
          description: 'ขายหน้าร้าน+ออนไลน์ จัดการหลายสาขา ชำระเงินครบรูปแบบ',
          icon: '🛒',
          image: 'https://uplift-uploads.s3.ap-southeast-1.amazonaws.com/admin/1755081810814-csakbmjowd6-possystemcashier.jpg',
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          className: 'md:col-span-1',
          clickAction: 'modal'
        },
        {
          id: 6,
          title: 'Transport Management',
          description: 'บริหารยานพาหนะ วางแผนเส้นทาง ติดตามเรียลไทม์',
          icon: '🚛',
          image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=600&fit=crop&auto=format',
          bgColor: 'bg-orange-100 dark:bg-orange-900/20',
          className: 'md:col-span-1',
          clickAction: 'modal'
        }
      ]
    }
  }

  /**
   * Enhanced validation for SolutionGrid specific requirements
   */
  validateData(data: WidgetData) {
    const baseValidation = super.validateData(data)
    const errors = [...baseValidation.errors]

    // Validate items array
    if (!data.items || !Array.isArray(data.items)) {
      errors.push('Items array is required')
    } else {
      data.items.forEach((item: any, index: number) => {
        if (!item.title || typeof item.title !== 'string') {
          errors.push(`Item ${index + 1} must have a valid title`)
        }
        if (!item.description || typeof item.description !== 'string') {
          errors.push(`Item ${index + 1} must have a valid description`)
        }
        if (!item.icon || typeof item.icon !== 'string') {
          errors.push(`Item ${index + 1} must have a valid icon`)
        }
        if (!item.image || typeof item.image !== 'string') {
          errors.push(`Item ${index + 1} must have a valid image URL`)
        }
        if (!item.bgColor || typeof item.bgColor !== 'string') {
          errors.push(`Item ${index + 1} must have a valid background color`)
        }
      })
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: baseValidation.warnings
    }
  }

  /**
   * Check if widget supports specific features
   */
  protected supportsFeature(feature: string): boolean {
    const supportedFeatures = ['animations', 'responsive', 'bento', 'modal', 'interactivity']
    return supportedFeatures.includes(feature) || super.supportsFeature(feature)
  }
}