module GameManager
  class WinChecker < ApplicationService

    attr_reader :sign, :field, :win_row_size, :width, :height
  
    def initialize(top, left, sign, field, win_row_size)
      @top = top
      @left = left
      @sign = sign
      @field = field
      @width = field[0].size
      @height = field.size
      @win_row_size = win_row_size
    end

    def call
      return check_win(@left, @top)
    end

    private

    def win? row
      row.chunk_while{ |a, b| a == sign && b == sign }
        .to_a.any?{ |c| c.length >= win_row_size }
    end

    def check_win(col, row)
      return check_vertical(col) ||
        check_horizontal(row) ||
        check_diag(col, row) ||
        check_anti_diag(col, row)
    end
  
    def check_vertical col
      win? field.map{ |r| r[col] }
    end
    
    def check_horizontal row
      win? field[row]
    end
  
    def check_diag(col, row)
      shift = [col, row].min
      from_col = col - shift
      from_row = row - shift
      row = []
      while from_col < width && from_row < height do
        row << field[from_row][from_col]
        from_col += 1
        from_row += 1
      end
      win? row
    end
  
    def check_anti_diag(col, row)
      shift = [width - 1 - col, row].min
      from_col = col + shift
      from_row = row - shift
      row = []
      while from_col >= 0 && from_row < height do
        row << field[from_row][from_col]
        from_col -= 1
        from_row += 1
      end
      win? row
    end
  end
end