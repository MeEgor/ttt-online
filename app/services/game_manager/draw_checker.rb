module GameManager
  class DrawChecker < ApplicationService

    attr_reader :sign, :field, :win_row_size, :width, :height
  
    def initialize(sign, field, win_row_size)
      @sign = sign
      @field = field
      @width = field[0].size
      @height = field.size
      @win_row_size = win_row_size
    end

    def call
      return check_rows(field) || 
        check_rows(cols) ||
        check_rows(diags) ||
        check_rows(anti_diags)
    end

    private

    def can_win? row
      row.map{ |s| s.nil? ? sign : s }
        .chunk_while{ |a, b| a == sign && b == sign }
        .to_a.any?{ |c| c.length >= win_row_size }
    end

    def diag_for(top, left)
      diag = []
      while top < height && left < width
        diag << field[top][left]
        top += 1
        left += 1
      end
      diag
    end
    
    def anti_diag_for(top, left)
      diag = []
      while top < height && left >= 0 do
        diag << field[top][left]
        top += 1
        left -= 1
      end
      diag
    end

    def diags
      diags = (0..height - 1).to_a.map{ |top| diag_for(top, 0) } 
      diags += (1..width - 1).to_a.map{ |left| diag_for(0, left) }
      return diags.select{ |d| d.length >= win_row_size }
    end

    def anti_diags
      anti_diags = (0..width - 1).to_a.map{ |left| anti_diag_for(0, left) }
      anti_diags += (1..height - 1).to_a.map{ |top| anti_diag_for(top, width - 1) }
      return anti_diags.select{ |d| d.length >= win_row_size }
    end

    def check_rows rows
      has_move = false
      for row in rows
        if can_win? row
          has_move = true
          break
        end
      end
      return has_move
    end

    def cols
      (0..width - 1).to_a.map{ |i| field.map{ |row| row[i] }}
    end
  end
end